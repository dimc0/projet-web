import { useState, useEffect } from "react";
import "./assets/AjouterRdv.css";

export function AjouterRdv({ contacts = [], rdv, onSave, onCancel }) {
  // -------------------------------
  // 1️⃣ État local pour le formulaire
  // -------------------------------
  const [formData, setFormData] = useState({
    id_contact: "",
    place: "",
    schedule: "",
  });
  const [error, setError] = useState("");   // pour afficher les erreurs
  const [loading, setLoading] = useState(false); // état "enregistrement"

  // -------------------------------
  // 2️⃣ Pré-remplissage si on édite un RDV
  // -------------------------------
  useEffect(() => {
    if (rdv) {
      // On transforme la date SQL "YYYY-MM-DD HH:MM" en format input datetime-local
      const scheduleDate = new Date(rdv.schedule.replace(" ", "T"));
      const localDate = new Date(
        scheduleDate.getTime() - scheduleDate.getTimezoneOffset() * 60000
      );
      const formattedDate = localDate.toISOString().slice(0, 16);

      setFormData({
        id_contact: rdv.id_contact.toString(),
        place: rdv.place || "",
        schedule: formattedDate,
      });
    } else {
      // Nouveau RDV : valeur par défaut maintenant + 1h
      const defaultDate = new Date();
      defaultDate.setHours(defaultDate.getHours() + 1, 0, 0, 0);
      setFormData({
        id_contact: "",
        place: "",
        schedule: defaultDate.toISOString().slice(0, 16),
      });
    }
  }, [rdv]);

  // -------------------------------
  // 3️⃣ Gestion des changements de champ
  // -------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // -------------------------------
  // 4️⃣ Soumission du formulaire
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation simple
    if (!formData.id_contact || !formData.place || !formData.schedule) {
      setError("Tous les champs sont requis");
      setLoading(false);
      return;
    }

    try {
      // On convertit la date en format SQL "YYYY-MM-DD HH:MM"
      const d = new Date(formData.schedule);
      const formattedSchedule = `${d.getFullYear()}-${String(
        d.getMonth() + 1
      ).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(
        d.getHours()
      ).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

      const dataToSend = {
        ...formData,
        id_contact: parseInt(formData.id_contact),
        schedule: formattedSchedule,
      };

      if (rdv) dataToSend.id = rdv.id; // si modification, ajouter l'ID

      await onSave(dataToSend); // appel à la fonction passée depuis App
    } catch (err) {
      setError("Erreur lors de l'enregistrement");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // 5️⃣ JSX du composant
  // -------------------------------
  return (
    <div className="ajouter-rdv-container">
      <div className="ajouter-rdv-wrapper">
        <h2>{rdv ? "Modifier le rendez-vous" : "Nouveau rendez-vous"}</h2>

        <form onSubmit={handleSubmit} className="ajouter-rdv-form">
          {/* Sélection du contact */}
          <div className="form-group">
            <label>Contact *</label>
            <select
              name="id_contact"
              value={formData.id_contact}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner un contact</option>
              {contacts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} - {c.email}
                </option>
              ))}
            </select>
          </div>

          {/* Lieu */}
          <div className="form-group">
            <label>Lieu *</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              placeholder="Ex: Bureau client, Visioconférence, Café..."
              required
            />
          </div>

          {/* Date et heure */}
          <div className="form-group">
            <label>Date et heure *</label>
            <input
              type="datetime-local"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              required
            />
          </div>

          {/* Message d'erreur */}
          {error && <div className="message-error">{error}</div>}

          {/* Boutons */}
          <div className="form-actions">
            <button type="button" onClick={onCancel} disabled={loading}>
              Annuler
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Enregistrement..." : rdv ? "Modifier" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
