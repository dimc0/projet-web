import { useState } from "react";
import "./assets/Editcontact.css";

export function Editcontact({ setView, prospect, onUpdateProspect, status }) {
  const [formData, setFormData] = useState({
    name: prospect.name || "",
    email: prospect.email || "",
    phone: prospect.phone || "",
    source: prospect.source || "Web",
    note: prospect.note || "",
    id_status: prospect.id_status || 1,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) return setError("Le nom est requis");
    if (!formData.email.trim()) return setError("L'email est requis");
    if (!formData.phone.trim()) return setError("Le téléphone est requis");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      return setError("L'email n'est pas valide");

    try {
      const res = await fetch("http://localhost/crm/php/contacts.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: prospect.id }),
      });

      const data = await res.json();
      if (!data.success) throw new Error("Erreur serveur");

      if (onUpdateProspect) onUpdateProspect({ ...formData, id: prospect.id });
      setSuccess(true);

      setTimeout(() => setView("prospects"), 1000);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour");
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-wrapper">
        <h2 className="edit-title">Éditer le prospect</h2>

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
            <label className="form-label">Téléphone *</label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="06 12 34 56 78"
              value={formData.phone}
              onChange={handleChange}
              required
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
            <label className="form-label">Statut</label>
            <select 
              name="id_status" 
              value={formData.id_status} 
              onChange={handleChange}
              className="form-select"
            >
              {status.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
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
          {success && <div className="message message-success">Prospect mis à jour !</div>}

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => setView("prospects")}
            >
              Annuler
            </button>
            <button type="submit" className="btn-submit">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
