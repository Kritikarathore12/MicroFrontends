// FILE PURPOSE: Standalone React entry point. ONLY used for local testing (npm run dev). Ignored by Vue Host.
// Standard React entry point used ONLY when running this micro-frontend standalone (npm run dev)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
