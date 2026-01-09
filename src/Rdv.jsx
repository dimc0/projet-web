import "./assets/Rdv.css";

export function RdvList({ rdv = [], onEditRdv, onDeleteRdv, setView }) {
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formatTime = (dateString) => new Date(dateString).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rdv-container">
      <div className="rdv-header">
        <h1 className="rdv-title">Rendez-vous</h1>
        <button className="btn-primary" onClick={() => setView("ajouter-rdv")}>
          Ajouter un RDV
        </button>
        {rdv.length === 0 && <p>Aucun rendez-vous pour le moment</p>}
      </div>

      {rdv.length > 0 && (
        <ul className="rdv-list">
          {rdv.sort((a, b) => new Date(a.schedule) - new Date(b.schedule))
            .map((r) => (
              <li key={r.id} className="rdv-card">
                <div className="rdv-info">
                  <div className="rdv-date">
                    <strong>{formatDate(r.schedule)}</strong> à {formatTime(r.schedule)}
                  </div>
                  <div className="rdv-details">
                    {r.place && <span>📍 {r.place}</span>}
                    {r.contact_name && <span>👤 {r.contact_name}</span>}
                    {r.contact_email && <span>📧 {r.contact_email}</span>}
                    {r.contact_phone && <span>📞 {r.contact_phone}</span>}
                  </div>
                </div>
                <div className="rdv-actions">
                  <button onClick={() => onEditRdv && onEditRdv(r)}>✏️</button>
                  <button onClick={() => onDeleteRdv && onDeleteRdv(r.id)}>🗑️</button>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
