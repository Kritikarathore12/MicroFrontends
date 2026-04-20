import React, { useState, useEffect } from 'react'
import { bridge } from './utils/bridge-client'

function Signup({ onLogin }) {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading]   = useState(false)

  useEffect(() => {
    bridge.init()
  }, [])

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
    const usersStr = await bridge.getItem('usersDB')
    const users    = JSON.parse(usersStr || '[]')

    if (users.find(u => u.email === email)) {
      setLoading(false)
      setErrorMsg('Email already registered. Please sign in.')
      return
    }

    users.push({ name, email, password })
    await bridge.setItem('usersDB', JSON.stringify(users))

    const token = 'jwt.' + btoa(JSON.stringify({ email, name })) + '.' + Date.now()
    await bridge.setItem('jwt_token', token)
    setLoading(false)

    if (onLogin) onLogin(token)
  }

  const inputStyle = {
    width: '100%', padding: '12px', borderRadius: '8px',
    border: '1px solid #334155', background: '#0f172a',
    color: 'white', fontSize: '14px', boxSizing: 'border-box',
    outline: 'none', marginBottom: '16px',
  }
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
          <input type="text"     placeholder="John Doe"         value={name}     onChange={e => setName(e.target.value)}     style={inputStyle} />

          <label style={labelStyle}>Email</label>
          <input type="email"    placeholder="you@example.com"  value={email}    onChange={e => setEmail(e.target.value)}    style={inputStyle} />

          <label style={labelStyle}>Password</label>
          <input type="password" placeholder="••••••••"          value={password} onChange={e => setPassword(e.target.value)} style={{ ...inputStyle, marginBottom: '24px' }} />

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '13px', background: loading ? '#064e3b' : 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', cursor: loading ? 'wait' : 'pointer', borderRadius: '8px', fontWeight: '600', fontSize: '15px', transition: 'opacity 0.2s' }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#64748b', marginTop: '20px', fontSize: '13px' }}>
          Already have an account?{' '}
          <span style={{ color: '#60a5fa', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => bridge.broadcast('NAVIGATE', '/login')}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  )
}

export default Signup