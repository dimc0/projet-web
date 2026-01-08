import { useState } from "react";
import "./assets/connexion.css";

export function Connexion({ onSuccess, listeadmin }) {

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  console.log(listeadmin);
  

  const handleSubmit = (e) => {
    e.preventDefault();

   
    console.log("📌 LISTEADMIN =", listeadmin);
    console.log("📌 EMAIL SAISI =", emailInput);

  const user = listeadmin.find((admin) => admin.email === emailInput);

  console.log("📌 USER TROUVÉ =", user);

    

  
    if (!user || user.password !== passwordInput) {
      setError("Email ou mot de passe incorrect");
      return;
    }

    setError("");
    onSuccess(user); 
  };

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
  );
}
