import React from 'react';
import Dashboard from './Dashboard';

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#030712', /* Slate 950 deep dark */
      padding: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <Dashboard />
      </div>
    </div>
  )
}
