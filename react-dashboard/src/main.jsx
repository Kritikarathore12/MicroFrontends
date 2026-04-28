import React from 'react'
import { createRoot } from 'react-dom/client'
import Component from './Dashboard'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>
)
