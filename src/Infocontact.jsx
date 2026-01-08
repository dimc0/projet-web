import "./assets/Infocontact.css";

export function Infocontact({ setView, idcontact, prospects }) {
  const contact = prospects.find(p => p.id === idcontact);

  if (!contact) {
    return (
      <div className="info-container">
        <div className="info-not-found">
          <h2>Contact introuvable</h2>
          <p>Le contact demandé n'existe pas ou a été supprimé.</p>
          <button className="btn-back" onClick={() => setView("prospects")}>
            Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="info-container">
      <div className="info-header">
        <h1 className="info-title">Informations du contact</h1>
      </div>

      <div className="info-card">
        <div className="info-section">
          <span className="info-label">Nom</span>
          <div className="info-value">{contact.name}</div>
        </div>

        <div className="info-section">
          <span className="info-label">Email</span>
          <div className="info-value">{contact.email}</div>
        </div>

        <div className="info-section">
          <span className="info-label">Téléphone</span>
          <div className="info-value">{contact.phone}</div>
        </div>

        <div className="info-section">
          <span className="info-label">Source</span>
          <div className="info-value">
            {contact.source || <span className="info-value-empty">Non renseigné</span>}
          </div>
        </div>

        <div className="info-section">
          <span className="info-label">Note</span>
          <div className="info-value">
            {contact.note || <span className="info-value-empty">Aucune note</span>}
          </div>
        </div>

        <div className="info-actions">
          <button className="btn-back" onClick={() => setView("prospects")}>
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}


