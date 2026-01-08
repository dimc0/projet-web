import "./assets/Prospect.css";

export function Prospect({
  setView,
  setSelectedContactId,
  prospects = [],
  onDeleteProspect,
}) {
  return (
    <div className="prospect-container">
      <div className="prospect-header">
        <h1 className="prospect-title">Prospects</h1>
        <button className="btn-primary" onClick={() => setView("ajouter-prospect")}>
          Ajouter un prospect
        </button>
      </div>
      
      {prospects.length === 0 ? (
        <div className="prospect-empty">
          <p>Aucun prospect pour le moment</p>
          <p>Cliquez sur "Ajouter un prospect" pour commencer</p>
        </div>
      ) : (
        <ul className="prospect-list">
          {prospects.map((p) => (
            <li
              key={p.id}
              className="prospect-card"
              onClick={() => {
                setSelectedContactId(p.id);
                setView("infocontact");
              }}
            >
              <div className="prospect-info">
                <div className="prospect-name">{p.name}</div>
                <div className="prospect-details">
                  <span className="prospect-detail-item">{p.email}</span>
                  <span className="prospect-detail-item">{p.phone}</span>
                  {p.source && (
                    <span className="prospect-detail-item">{p.source}</span>
                  )}
                </div>
              </div>
              <div className="prospect-actions">
                <button
                  type="button"
                  className="btn-icon btn-edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedContactId(p.id);
                    setView("edit-prospect");
                  }}
                  title="Modifier"
                >
                  Modifier
                </button>
                <button
                  type="button"
                  className="btn-icon btn-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${p.name} ?`)) {
                      if (onDeleteProspect) onDeleteProspect(p.id);
                    }
                  }}
                  title="Supprimer"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
