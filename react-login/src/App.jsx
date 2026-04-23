// FILE PURPOSE: Standalone React root component. ONLY used for local testing. Ignored by Vue Host.
// Root React component used ONLY when running this micro-frontend standalone (npm run dev)
import LoginForm from './components/loginForm'

function App() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5173/dashboard'
  }
  return <LoginForm onLogin={handleLogin} />
}

export default App
