import "./assets/Clients.css";

export function Clients({ setView, setSelectedContactId, prospects = [] }) {
  return (
    <div className="clients-container">
      <div className="clients-header">
        <h1 className="clients-title">Clients</h1>
      </div>

      {prospects.length === 0 ? (
        <div className="clients-empty">
          <p>Aucun client pour le moment</p>
        </div>
      ) : (
        <ul className="clients-list">
          {prospects.map((client) => (
            <li
              key={client.id}
              className="client-card"
              onClick={() => {
                setSelectedContactId(client.id);
                setView("infocontact");
              }}
            >
              <div className="client-info">
                <div className="client-name">{client.name}</div>
                <div className="client-details">
                  <span className="client-detail-item">{client.email}</span>
                  <span className="client-detail-item">{client.phone}</span>
                  {client.source && (
                    <span className="client-detail-item">{client.source}</span>
                  )}
                </div>
              </div>
              <div className="prospect-actions">
                <button
                  type="button"
                  className="btn-icon btn-edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedContactId(client.id);
                    setView("edit-prospect");
                  }}
                  title="Modifier"
                >
                  ✏️
                </button>
                <button
                  type="button"
                  className="btn-icon btn-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      window.confirm(
                        `Êtes-vous sûr de vouloir supprimer ${client.name} ?`
                      )
                    ) {
                      if (onDeleteProspect) onDeleteProspect(client.id);
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
