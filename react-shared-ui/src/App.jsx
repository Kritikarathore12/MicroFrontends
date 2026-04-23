// FILE PURPOSE: Standalone React root component. ONLY used for local testing. Ignored by Vue Host.
import React from 'react';
import Button from './components/Button';
import Input from './components/Input';

function App() {
  return (
    <div style={{ padding: '40px', background: '#0b1020', color: 'white', minHeight: '100vh' }}>
      <h1>Shared UI Components Library</h1>
      <p>This micro-frontend is a component library. It is not meant to be run standalone, but you can preview components here.</p>
      
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #334155', borderRadius: '8px' }}>
        <h3>Buttons</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="danger">Danger Button</Button>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #334155', borderRadius: '8px' }}>
        <h3>Inputs</h3>
        <Input placeholder="Example input field..." />
      </div>
    </div>
  );
}

export default App;
