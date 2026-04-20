import Signup from './Signup'

// When used standalone (localhost:5002), redirect to Vue host after signup
function handleLogin(token) {
  window.location.href = 'http://localhost:5173/dashboard'
}

function App() {
  return <Signup onLogin={handleLogin} />
}

export default App