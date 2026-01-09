import { useState } from "react";
import "./assets/AjouterProspect.css"; 

export function AjouterRdv({ setView, onAddRdv, contacts }) {
  const [formData, setFormData] = useState({
    schedule: "",
    place: "",
    id_contact: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Mise à jour des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.schedule || !formData.id_contact || !formData.place) {
      setError("Date, contact et lieu requis");
      return;
    }

    try {
      await onAddRdv(formData);
      setSuccess(true);
      setTimeout(() => setView("rdv"), 1000);
    } catch (err) {
      console.error(err);
      setError("Impossible d'ajouter le rendez-vous");
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2 className="form-title">Ajouter un rendez-vous</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          
          {/* DATE + HEURE */}
          <div className="form-group">
            <label className="form-label">Date & Heure *</label>
            <input
              type="datetime-local"
              name="schedule"
              className="form-input"
              value={formData.schedule}
              onChange={handleChange}
              required
            />
          </div>

          {/* CONTACT */}
          <div className="form-group">
            <label className="form-label">Contact *</label>
            <select
              name="id_contact"
              className="form-select"
              value={formData.id_contact}
              onChange={handleChange}
              required
            >
              <option value="">-- Sélectionner un contact --</option>
              {contacts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.email}
                </option>
              ))}
            </select>
          </div>

          {/* LIEU */}
          <div className="form-group">
            <label className="form-label">Lieu *</label>
            <input
              type="text"
              name="place"
              className="form-input"
              placeholder="Ex : Bureau, Visio, Domicile..."
              value={formData.place}
              onChange={handleChange}
              required
            />
          </div>


          {error && <div className="message message-error">{error}</div>}
          {success && (
            <div className="message message-success">
              Rendez-vous ajouté avec succès !
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setView("rdv")}
            >
              Annuler
            </button>
            <button type="submit" className="btn-submit">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
