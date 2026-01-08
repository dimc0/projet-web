import "./assets/Nav.css";

export function Nav({ setView, currentView }) {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">CRM</div>
        <ul className="nav-menu">
          <li className="nav-item">
            <div 
              className={`nav-link ${currentView === "prospects" ? "active" : ""}`}
              onClick={() => setView("prospects")}
            >
              Prospects
            </div>
          </li>
          <li className="nav-item">
            <div 
              className={`nav-link ${currentView === "clients" ? "active" : ""}`}
              onClick={() => setView("clients")}
            >
              Clients
            </div>
          </li>
          <li className="nav-item">
            <div 
              className={`nav-link ${currentView === "rdv" ? "active" : ""}`}
              onClick={() => setView("rdv")}
            >
              Rendez-vous
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
