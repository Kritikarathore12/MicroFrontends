import LoginForm from './components/loginForm'

function App() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5173/dashboard'
  }
  return <LoginForm onLogin={handleLogin} />
}

export default App