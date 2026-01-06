import { useState } from "react"
import "./assets/connexion.css"

export function Connexion({ onSuccess }) {
  const admin = "test@test.com"
  const password = "test"

  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (emailInput !== admin || passwordInput !== password) {
      setError("Email ou mot de passe incorrect")
    } else {
      setError("")
      onSuccess() 
    }
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Connexion</button>
      </form>
    </div>
  )
}
