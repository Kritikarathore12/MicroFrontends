// FILE PURPOSE: Standalone React root component. ONLY used for local testing. Ignored by Vue Host.
// Root React component used ONLY when running this micro-frontend standalone (npm run dev)
import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import { eventBus } from './utils/event-bus';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    eventBus.init();
    const fetchToken = async () => {
      const storedToken = await eventBus.getItem('jwt_token');
      setToken(storedToken || '');
    };
    fetchToken();
  }, []);

  return <Profile token={token} />;
}

export default App;

