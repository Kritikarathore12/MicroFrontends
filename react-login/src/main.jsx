import React from 'react'
import { createRoot } from 'react-dom/client'
import LoginForm from './components/loginForm'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <LoginForm onLogin={(token) => console.log('Standalone login successful, token:', token)} />
  </React.StrictMode>
)
