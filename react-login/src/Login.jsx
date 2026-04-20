import LoginForm from "./components/loginForm"

function Login({ onLogin }) {
  return (
    <div>
      <LoginForm onLogin={onLogin} />
    </div>
  )
}

export default Login