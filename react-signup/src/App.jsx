// FILE PURPOSE: Standalone React root component. ONLY used for local testing. Ignored by Vue Host.
// Root React component used ONLY when running this micro-frontend standalone (npm run dev)
import Signup from './Signup'

// When used standalone (localhost:5002), redirect to Vue host after signup
function handleLogin(token) {
  window.location.href = 'http://localhost:5173/dashboard'
}

function App() {
  return <Signup onLogin={handleLogin} />
}

export default App
