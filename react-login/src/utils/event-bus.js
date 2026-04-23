// FILE PURPOSE: Communication utility that allows this app to share data with other micro-frontends via the native Window object.

const listeners = new Set()

window.addEventListener('MFE_BROADCAST', (event) => {
  const { eventName, detail } = event.detail
  listeners.forEach(cb => cb(eventName, detail))
})

export const eventBus = {

  broadcast: (eventName, detail) => {
    window.dispatchEvent(new CustomEvent('MFE_BROADCAST', { 
      detail: { eventName, detail } 
    }))
  },

  onBroadcast: (cb) => {
    listeners.add(cb)
    return () => listeners.delete(cb)
  },

  isReady: () => true,
}
