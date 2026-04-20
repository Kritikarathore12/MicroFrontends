import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// We now securely pull the Client ID from the local .env file
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStandardLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg("Please fill details");
      return;
    }

    // Check credentials against local DB
    const usersDB = JSON.parse(localStorage.getItem('usersDB') || '[]');
    const user = usersDB.find(u => u.email === email);

    if (!user) {
      setErrorMsg("User not found. Please sign up.");
      return;
    }
    
    if (user.password !== password) {
      setErrorMsg("Incorrect password. Please try again.");
      return;
    }

    // Success! Log them in
    const fakeJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy." + Date.now();
    localStorage.setItem('jwt_token', fakeJwtToken);
    if (onLogin) onLogin(fakeJwtToken);
  }

  // Handle successful Google Login
  const handleGoogleSuccess = (credentialResponse) => {
    // The "credential" returned by Google is an extremely secure JWT token identifying the user
    const googleJwtToken = credentialResponse.credential;

    // Save Google's Real JWT to our local storage
    localStorage.setItem('jwt_token', googleJwtToken);

    // Tell Vue to unlock the dashboard using Google's JWT!
    if (onLogin) {
      onLogin(googleJwtToken);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '10px', maxWidth: '400px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 20px 0', color: 'white' }}>Welcome Back</h2>
        
        {errorMsg && (
          <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', borderRadius: '6px', textAlign: 'center', marginBottom: '20px', fontSize: '14px' }}>
            {errorMsg}
          </div>
        )}

        {/* Google Authentication Component */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.error('Login Failed');
              alert("Google Authentication Failed");
            }}
            theme="filled_black"
            size="large"
            width="340"
          />
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: '#64748b' }}>
          <hr style={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
          <span style={{ padding: '0 10px', fontSize: '12px', fontWeight: '500' }}>OR CONTINUE WITH EMAIL</span>
          <hr style={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Standard Auth Form */}
        <form onSubmit={handleStandardLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white', boxSizing: 'border-box' }}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white', boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '6px', fontWeight: '600', fontSize: '15px', transition: 'background 0.2s' }}>
            Mock Login
          </button>
        </form>
      </div>
    </GoogleOAuthProvider>
  )
}

export default LoginForm;