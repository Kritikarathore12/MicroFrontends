// FILE PURPOSE: The core React UI and registration logic for the Signup screen.
import React, { useState, useEffect } from 'react'
import { eventBus } from './utils/event-bus'
import Button from 'react_shared_ui/Button'
import Input from 'react_shared_ui/Input'

function Signup({ onLogin }) {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading]   = useState(false)

  useEffect(() => {
    eventBus.init()
  }, [])

  // Validates inputs, registers a new user in the shared database, and generates an auth token
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!name || !email || !password) {
      setErrorMsg('Please fill in all fields.')
      return
    }
    if (password.length < 4) {
      setErrorMsg('Password must be at least 4 characters.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Backend automatically sets the HttpOnly cookie for session!
      // We no longer need to save the token in localStorage.
      if (onLogin) onLogin('cookie_session_active')
    } catch (err) {
      setErrorMsg(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { marginBottom: '16px' }
  const labelStyle = {
    color: '#94a3b8', fontSize: '13px', fontWeight: '500',
    display: 'block', marginBottom: '6px',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b1020', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '16px', maxWidth: '420px', width: '100%', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 8px', color: 'white', fontSize: '28px', fontWeight: '700' }}>Create Account</h2>
        <p  style={{ textAlign: 'center', color: '#64748b', margin: '0 0 30px', fontSize: '14px' }}>Join us today — it's free</p>

        {errorMsg && (
          <div style={{ padding: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Full Name</label>
          <Input type="text"     placeholder="John Doe"         value={name}     onChange={e => setName(e.target.value)}     style={inputStyle} />

          <label style={labelStyle}>Email</label>
          <Input type="email"    placeholder="you@example.com"  value={email}    onChange={e => setEmail(e.target.value)}    style={inputStyle} />

          <label style={labelStyle}>Password</label>
          <Input type="password" placeholder="••••••••"          value={password} onChange={e => setPassword(e.target.value)} style={{ marginBottom: '24px' }} />

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            style={{ width: '100%' }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <p style={{ textAlign: 'center', color: '#64748b', marginTop: '20px', fontSize: '13px' }}>
          Already have an account?{' '}
          <span style={{ color: '#60a5fa', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => eventBus.broadcast('NAVIGATE', '/login')}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  )
}

export default Signup
