import { useState } from "react";
import "./assets/AjouterProspect.css";

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
    <div className="form-container">
      <div className="form-wrapper">
        <h2 className="form-title">Ajouter un prospect</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nom *</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Nom complet"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="email@exemple.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Téléphone</label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="06 12 34 56 78"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Source</label>
            <select 
              name="source" 
              value={formData.source} 
              onChange={handleChange}
              className="form-select"
            >
              <option value="Web">Web</option>
              <option value="Salon">Salon</option>
              <option value="Email">Email</option>
              <option value="Réseaux sociaux">Réseaux sociaux</option>
              <option value="Recommandation">Recommandation</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Note (optionnel)</label>
            <textarea
              name="note"
              className="form-textarea"
              placeholder="Ajoutez une note sur ce prospect..."
              value={formData.note}
              onChange={handleChange}
              rows="4"
            />
          </div>

          {error && <div className="message message-error">{error}</div>}
          {success && <div className="message message-success">Prospect ajouté avec succès !</div>}

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => setView("prospects")}
            >
              Annuler
            </button>
            <button type="submit" className="btn-submit">Ajouter</button>
          </div>
          </form>
      </div>
    </div>
  );
}
