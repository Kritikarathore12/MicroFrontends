import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import { bridge } from './utils/bridge-client';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    bridge.init();
    const fetchToken = async () => {
      const storedToken = await bridge.getItem('jwt_token');
      setToken(storedToken || '');
    };
    fetchToken();
  }, []);

  return <Profile token={token} />;
}

export default App;

