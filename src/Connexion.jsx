import { useState } from "react";
import "./assets/connexion.css";

export function Connexion({ onSuccess, listeadmin }) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const user = listeadmin.find((admin) => admin.email === emailInput);

    if (!user || user.password !== passwordInput) {
      setError("Email ou mot de passe incorrect");
      return;
    }

    setError("");
    onSuccess(user);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <h1 className="login-title">Connexion</h1>
          <p className="login-subtitle">Accédez à votre espace CRM</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
          />

          <input
            type="password"
            className="login-input"
            placeholder="Mot de passe"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
          />

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
