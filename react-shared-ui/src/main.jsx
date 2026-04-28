import React from 'react'
import { createRoot } from 'react-dom/client'
import Button from './components/Button'
import Input from './components/Input'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <div style={{ padding: '20px', background: '#0b1020', minHeight: '100vh', color: 'white' }}>
      <h1>Shared UI Components</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>Input Component:</label>
        <Input placeholder="Test Input" />
      </div>
      <div>
        <label>Button Component:</label><br/>
        <Button>Test Button</Button>
      </div>
    </div>
  </React.StrictMode>
)
