import "./assets/Rdv.css";

export function RdvList({ rdv = [], onEditRdv, onDeleteRdv }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="rdv-container">
      <div className="rdv-header">
        <h1 className="rdv-title">Rendez-vous</h1>
        {rdv.length === 0 && (
          <div className="rdv-empty">
            <p>Aucun rendez-vous pour le moment</p>
          </div>
        )}
      </div>

      {rdv.length > 0 && (
        <ul className="rdv-list">
          {rdv
            .sort((a, b) => new Date(a.schedule) - new Date(b.schedule))
            .map((r) => (
              <li key={r.id} className="rdv-card">
                <div className="rdv-info">
                  <div className="rdv-date">
                    <strong>{formatDate(r.schedule)}</strong> à {formatTime(r.schedule)}
                  </div>
                  <div className="rdv-details">
                    <span className="rdv-detail-item">
                      📍 {r.place || "Lieu non défini"}
                    </span>
                    {r.contact_name && (
                      <span className="rdv-detail-item">👤 {r.contact_name}</span>
                    )}
                    {r.contact_email && (
                      <span className="rdv-detail-item">📧 {r.contact_email}</span>
                    )}
                    {r.contact_phone && (
                      <span className="rdv-detail-item">📞 {r.contact_phone}</span>
                    )}
                  </div>
                </div>

                <div className="rdv-actions">
                  <button
                    type="button"
                    className="btn-icon btn-edit"
                    onClick={() => onEditRdv && onEditRdv(r)}
                    title="Modifier"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    className="btn-icon btn-delete"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Êtes-vous sûr de vouloir supprimer le RDV avec ${
                            r.contact_name || "contact inconnu"
                          } ?`
                        )
                      ) {
                        onDeleteRdv && onDeleteRdv(r.id);
                      }
                    }}
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
