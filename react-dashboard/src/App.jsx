// FILE PURPOSE: Standalone React root component. ONLY used for local testing. Ignored by Vue Host.
// Root React component used ONLY when running this micro-frontend standalone (npm run dev)
import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import { eventBus } from './utils/event-bus';

export default function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    eventBus.init();
    const fetchToken = async () => {
      const storedToken = await eventBus.getItem('jwt_token');
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

