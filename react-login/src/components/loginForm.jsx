import React, { useState, useEffect } from 'react'
import { bridge } from '../utils/bridge-client'

function LoginForm({ onLogin }) {
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

    if (!email || !password) {
      setErrorMsg('Please fill in all fields.')
      return
    }

    setLoading(true)
    const usersStr = await bridge.getItem('usersDB')
    const users    = JSON.parse(usersStr || '[]')
    const user     = users.find(u => u.email === email)
    setLoading(false)

    if (!user) {
      setErrorMsg('No account found. Please sign up first.')
      return
    }
    if (user.password !== password) {
      setErrorMsg('Incorrect password.')
      return
    }

    const token = 'jwt.' + btoa(JSON.stringify({ email: user.email, name: user.name })) + '.' + Date.now()
    await bridge.setItem('jwt_token', token)
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
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '16px', maxWidth: '400px', width: '100%', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 8px', color: 'white', fontSize: '28px', fontWeight: '700' }}>Welcome Back</h2>
        <p  style={{ textAlign: 'center', color: '#64748b', margin: '0 0 30px', fontSize: '14px' }}>Sign in to your account</p>

        {errorMsg && (
          <div style={{ padding: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Email</label>
          <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />

          <label style={labelStyle}>Password</label>
          <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ ...inputStyle, marginBottom: '24px' }} />

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '13px', background: loading ? '#1e3a5f' : 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white', border: 'none', cursor: loading ? 'wait' : 'pointer', borderRadius: '8px', fontWeight: '600', fontSize: '15px', transition: 'opacity 0.2s' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#64748b', marginTop: '20px', fontSize: '13px' }}>
          Don't have an account?{' '}
          <span style={{ color: '#60a5fa', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => bridge.broadcast('NAVIGATE', '/signup')}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginForm