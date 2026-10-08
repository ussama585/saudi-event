import { Link } from 'react-router-dom'
import './App.css'

function RegistrationForm() {
  return (
    <main className="registration-page">
      <h1>Registration Form</h1>
      <Link className="route-link" to="/">
        Back to home
      </Link>
    </main>
  )
}

export default RegistrationForm
