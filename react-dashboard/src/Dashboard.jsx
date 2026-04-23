// FILE PURPOSE: The core React UI and bidirectional messaging logic for the Dashboard screen.
import React, { useState, useEffect } from 'react'
import { eventBus } from './utils/event-bus'
import Button from 'react_shared_ui/Button'
import Input from 'react_shared_ui/Input'

const cardStyle = {
  padding: '24px',
  borderRadius: '16px',
  background: 'rgba(0,0,0,0.2)',
  border: '1px solid rgba(255,255,255,0.05)',
  transition: 'transform 0.2s, background 0.2s',
  cursor: 'pointer',
}
const onCard = (e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }
const offCard = (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(0,0,0,0.2)' }

const stats = [
  { label: 'Total Views',  value: '24.8K', change: '↑ 12%',  positive: true },
  { label: 'Active Users', value: '1,294', change: '↓ 2.4%', positive: false },
  { label: 'Engagement',   value: '68%',   change: '↑ 5.1%', positive: true },
]

export default function Dashboard({ token: initialToken }) {
  const [token, setToken]       = useState(initialToken)
  const [vueMessage, setVueMessage] = useState('')
  const [inputMsg, setInputMsg] = useState('')

  useEffect(() => {
    if (initialToken) setToken(initialToken)
  }, [initialToken])

  useEffect(() => {
    eventBus.init()
    
    // Verify session via the backend
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setToken('cookie_session_active')
        } else {
          setToken(null)
        }
      })
      .catch(() => setToken(null))

    const unsubscribe = eventBus.onBroadcast((eventName, detail) => {
      if (eventName === 'HostToDashboard') setVueMessage(detail)
      if (eventName === 'USER_LOGOUT') setToken(null)
    })
    return () => unsubscribe()
  }, [])

  // Sends a custom text message to the Vue Host via the event bus
  const sendToHost = () => {
    if (!inputMsg.trim()) return
    eventBus.broadcast('DashboardToHost', inputMsg)
    setInputMsg('')
  }

  if (!token) {
    return (
      <div style={{ padding: '40px', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '16px', color: '#f87171', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ margin: '0 0 10px' }}>⚠️ No active session</h2>
        <p>Please login to access the dashboard.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px', background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      <h2 style={{ margin: '0 0 8px', fontSize: '36px', fontWeight: '800', background: 'linear-gradient(to right, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>
        Overview Dashboard
      </h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ padding: '12px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80', borderRadius: '8px', flex: 1 }}>
          <strong>✅ Authenticated session active</strong>
        </div>
        <Button
          onClick={() => eventBus.broadcast('GLOBAL_ALERT', 'Dashboard says: Hello from React! 🚀')}
          style={{ marginLeft: '15px' }}
        >
          🚀 Trigger Host Alert
        </Button>
      </div>

      <div style={{ padding: '24px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '16px', marginBottom: '32px' }}>
        <h3 style={{ margin: '0 0 12px', color: '#60a5fa', fontSize: '18px' }}>Bidirectional Messaging</h3>
        <p style={{ margin: '0 0 16px', color: '#cbd5e1', fontSize: '15px' }}>
          Vue Host says: <strong style={{ color: 'white', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>{vueMessage || 'No message yet...'}</strong>
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Input
            value={inputMsg}
            onChange={e => setInputMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendToHost()}
            placeholder="Type a message for the Vue Host..."
            style={{ flex: 1 }}
          />
          <Button
            onClick={sendToHost}
            variant="primary"
          >
            Send to Vue
          </Button>
        </div>
      </div>

      <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px' }}>Real-time metrics from the React micro-frontend.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {stats.map(({ label, value, change, positive }) => (
          <div key={label} style={cardStyle} onMouseOver={onCard} onMouseOut={offCard}>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</p>
            <p style={{ margin: '12px 0 0', fontSize: '32px', fontWeight: '700', color: '#f8fafc' }}>{value}</p>
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ padding: '4px 8px', background: positive ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)', color: positive ? '#4ade80' : '#f87171', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>{change}</span>
              <span style={{ color: '#64748b', fontSize: '13px' }}>vs last week</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
