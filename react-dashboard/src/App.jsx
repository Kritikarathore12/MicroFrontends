import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import { bridge } from './utils/bridge-client';

export default function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    bridge.init();
    const fetchToken = async () => {
      const storedToken = await bridge.getItem('jwt_token');
      setToken(storedToken || '');
    };
    fetchToken();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#030712',
      padding: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <Dashboard token={token} />
      </div>
    </div>
  )
}

