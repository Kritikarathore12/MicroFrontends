import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// We now securely pull the Client ID from the local .env file
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function Signup({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStandardSignup = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!name || !email || !password) {
      setErrorMsg("Please fill all details");
      return;
    }

    // Get existing users
    const usersDB = JSON.parse(localStorage.getItem('usersDB') || '[]');
    
    // Check if email already exists
    if (usersDB.find(user => user.email === email)) {
      setErrorMsg("Email already registered. Please login.");
      return;
    }

    // Save new user
    usersDB.push({ name, email, password });
    localStorage.setItem('usersDB', JSON.stringify(usersDB));

    // Sign them in
    const fakeJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy." + Date.now();
    localStorage.setItem('jwt_token', fakeJwtToken);
    if (onLogin) onLogin(fakeJwtToken);
  }

  // Handle successful Google Signup/Login
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
        <h2 style={{ textAlign: 'center', margin: '0 0 20px 0', color: 'white' }}>Create an Account</h2>
        
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
              console.error('Signup Failed');
              alert("Google Authentication Failed");
            }}
            theme="filled_black"
            size="large"
            width="340"
            text="signup_with"
          />
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: '#64748b' }}>
          <hr style={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
          <span style={{ padding: '0 10px', fontSize: '12px', fontWeight: '500' }}>OR SIGN UP WITH EMAIL</span>
          <hr style={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Standard Auth Form */}
        <form onSubmit={handleStandardSignup}>
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white', boxSizing: 'border-box' }}
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white', boxSizing: 'border-box' }}
          />
          <input 
            type="password" 
            placeholder="Create Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white', boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '6px', fontWeight: '600', fontSize: '15px', transition: 'background 0.2s' }}>
            Mock Sign Up
          </button>
        </form>
      </div>
    </GoogleOAuthProvider>
  )
}

export default Signup;