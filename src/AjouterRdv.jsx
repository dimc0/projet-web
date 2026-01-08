import { useState, useEffect } from "react";
import "./assets/AjouterRdv.css";

export function AjouterRdv({ contacts, rdv, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id_contact: "",
    place: "",
    schedule: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (rdv) {
      // Format datetime-local pour l'input (format: YYYY-MM-DDTHH:MM)
      // La date vient de la base au format "YYYY-MM-DD HH:MM"
      const scheduleDate = new Date(rdv.schedule.replace(' ', 'T'));
      // Ajuster pour le fuseau horaire local
      const localDate = new Date(scheduleDate.getTime() - scheduleDate.getTimezoneOffset() * 60000);
      const formattedDate = localDate.toISOString().slice(0, 16);
      
      setFormData({
        id_contact: rdv.id_contact.toString(),
        place: rdv.place || "",
        schedule: formattedDate,
      });
    } else {
      // Valeur par défaut : maintenant + 1 heure
      const defaultDate = new Date();
      defaultDate.setHours(defaultDate.getHours() + 1);
      defaultDate.setMinutes(0);
      const formattedDate = defaultDate.toISOString().slice(0, 16);
      setFormData({
        id_contact: "",
        place: "",
        schedule: formattedDate,
      });
    }
  }, [rdv]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.id_contact || !formData.place || !formData.schedule) {
      setError("Tous les champs sont requis");
      setLoading(false);
      return;
    }

    try {
      // Convertir la date au format attendu par la base de données (YYYY-MM-DD HH:MM)
      const scheduleDate = new Date(formData.schedule);
      const year = scheduleDate.getFullYear();
      const month = String(scheduleDate.getMonth() + 1).padStart(2, '0');
      const day = String(scheduleDate.getDate()).padStart(2, '0');
      const hours = String(scheduleDate.getHours()).padStart(2, '0');
      const minutes = String(scheduleDate.getMinutes()).padStart(2, '0');
      const formattedSchedule = `${year}-${month}-${day} ${hours}:${minutes}`;

      const dataToSend = {
        ...formData,
        id_contact: parseInt(formData.id_contact),
        schedule: formattedSchedule,
      };

      if (rdv) {
        dataToSend.id = rdv.id;
      }

      await onSave(dataToSend);
    } catch (err) {
      setError("Erreur lors de l'enregistrement");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ajouter-rdv-container">
      <div className="ajouter-rdv-wrapper">
        <h2 className="ajouter-rdv-title">
          {rdv ? "Modifier le rendez-vous" : "Nouveau rendez-vous"}
        </h2>

        <form className="ajouter-rdv-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Contact *</label>
            <select
              name="id_contact"
              value={formData.id_contact}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Sélectionner un contact</option>
              {contacts.map((contact) => (
                <option key={contact.id} value={contact.id}>
                  {contact.name} - {contact.email}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Lieu *</label>
            <input
              type="text"
              name="place"
              className="form-input"
              placeholder="Ex: Bureau client, Visioconférence, Café..."
              value={formData.place}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date et heure *</label>
            <input
              type="datetime-local"
              name="schedule"
              className="form-input"
              value={formData.schedule}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="message message-error">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? "Enregistrement..." : rdv ? "Modifier" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

