import { useState } from "react";
import "./assets/connexion.css";

export function AjouterProspect({ setView, onAddProspect }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "Web",
    note: "",
    status:"",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

  
    if (!formData.name || !formData.email) {
      setError("Nom et email requis");
      return;
    }

    try {
      await onAddProspect(formData); 
      setSuccess(true);
      setTimeout(() => setView("prospects"), 1000);
    } catch (err) {
      console.error(err);
      setError("Impossible d'ajouter le prospect");
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2>Ajouter un prospect</h2>

        <input
          type="text"
          name="name"
          placeholder="Nom *"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Téléphone"
          value={formData.phone}
          onChange={handleChange}
        />

        <select name="source" value={formData.source} onChange={handleChange}>
          <option value="Web">Web</option>
          <option value="Salon">Salon</option>
          <option value="Email">Email</option>
          <option value="Réseaux sociaux">Réseaux sociaux</option>
          <option value="Recommandation">Recommandation</option>
          <option value="Autre">Autre</option>
        </select>


        <select name="status" value={formData.source} onChange={handleChange}>
          <option value=""></option>
        </select>

        <textarea
          name="note"
          placeholder="Note (optionnel)"
          value={formData.note}
          onChange={handleChange}
          rows="4"
        />

        {error && <p className="error">{error}</p>}
        {success && <p style={{ color: "#10b981" }}>Prospect ajouté avec succès !</p>}

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <button type="button" onClick={() => setView("prospects")}>
            Annuler
          </button>
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  );
}
