import React, { useEffect } from 'react'
import { bridge } from './utils/bridge-client'

function Profile({ token }) {
  useEffect(() => {
    bridge.init()
    const unsubscribe = bridge.onBroadcast((eventName) => {
      if (eventName === 'USER_LOGOUT') window.location.reload()
    })
    return () => unsubscribe()
  }, [])

  let userInfo = null
  if (token) {
    const parts = token.split('.')
    for (const idx of [1, 2]) {
      if (!parts[idx]) continue
      try {
        const decoded = JSON.parse(atob(parts[idx]))
        if (decoded?.name || decoded?.email) { userInfo = decoded; break }
      } catch { /* skip */ }
    }
  }

  return (
    <div style={{ padding: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'system-ui, sans-serif', color: 'white' }}>
      <h1 style={{ background: 'linear-gradient(to right, #4ade80, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '32px', margin: '0 0 8px 0' }}>
        User Profile
      </h1>
      <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px' }}>Manage your account details</p>

      {token ? (
        <div>
          <div style={{ padding: '20px', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)', borderRadius: '12px', marginBottom: '20px' }}>
            <p style={{ color: '#4ade80', margin: 0, fontWeight: '600' }}>✅ Session Active</p>
          </div>

          {userInfo ? (
            <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              {userInfo.picture && <img src={userInfo.picture} alt="avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />}
              <div>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '18px' }}>{userInfo.name}</p>
                <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '14px' }}>{userInfo.email}</p>
              </div>
            </div>
          ) : (
            <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px' }}>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>Logged in via email/password</p>
            </div>
          )}
        </div>
      ) : (
        <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px' }}>
          <p style={{ color: '#f87171', margin: 0 }}>⚠️ No active session. Please login first.</p>
        </div>
      )}
    </div>
  )
}

export default Profile