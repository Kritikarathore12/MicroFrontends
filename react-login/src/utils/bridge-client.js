const BRIDGE_URL = 'http://localhost:5173/bridge.html'
const BRIDGE_ORIGIN = 'http://localhost:5173'
const REQUEST_TIMEOUT_MS = 8000

let iframe = null
let bridgeReady = false
const commandQueue = []
const pendingRequests = new Map()
const listeners = new Set()

function init() {
  if (iframe) return

  iframe = document.createElement('iframe')
  iframe.src = BRIDGE_URL
  iframe.style.cssText = 'display:none;width:0;height:0;border:0;'
  document.body.appendChild(iframe)

  window.addEventListener('message', (event) => {
    if (event.origin !== BRIDGE_ORIGIN) return

    const { type, requestId, value, eventName, detail } = event.data

    if (type === 'BRIDGE_READY') {
      if (bridgeReady) return
      bridgeReady = true
      while (commandQueue.length > 0) commandQueue.shift()()
    } else if (type === 'RESPONSE' && pendingRequests.has(requestId)) {
      const { resolve, timer } = pendingRequests.get(requestId)
      clearTimeout(timer)
      resolve(value)
      pendingRequests.delete(requestId)
    } else if (type === 'BROADCAST_RECEIVE') {
      listeners.forEach(cb => cb(eventName, detail))
    }
  })
}

const genId = () => Math.random().toString(36).substring(2, 9)

function sendRequest(type, payload) {
  const requestId = genId()
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      pendingRequests.delete(requestId)
      resolve(null)
    }, REQUEST_TIMEOUT_MS)

    pendingRequests.set(requestId, { resolve, timer })

    const send = () => {
      if (!iframe?.contentWindow) {
        clearTimeout(timer)
        pendingRequests.delete(requestId)
        resolve(null)
        return
      }
      iframe.contentWindow.postMessage({ ...payload, type, requestId }, BRIDGE_ORIGIN)
    }

    if (bridgeReady) send()
    else commandQueue.push(send)
  })
}

export const bridge = {
  init,
  getItem:    (key)        => sendRequest('GET_ITEM',    { key }),
  setItem:    (key, value) => sendRequest('SET_ITEM',    { key, value }),
  removeItem: (key)        => sendRequest('REMOVE_ITEM', { key }),

  broadcast: (eventName, detail) => {
    const send = () => {
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'BROADCAST_SEND', eventName, detail }, BRIDGE_ORIGIN)
      }
    }
    if (bridgeReady) send()
    else commandQueue.push(send)
  },

  onBroadcast: (cb) => {
    listeners.add(cb)
    return () => listeners.delete(cb)
  },

  isReady: () => bridgeReady,
}
