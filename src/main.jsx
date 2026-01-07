import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { Connexion } from "./Connexion";
import { Prospect } from "./Prospect";
import { Clients } from "./Clients";
import { Infocontact } from "./Infocontact";
import { AjouterProspect } from "./AjouterProspect";
import { prospects as initialProspects } from "./Prospect";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [view, setView] = useState("prospects");
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [prospects, setProspects] = useState(() => {
    // Charger depuis localStorage ou utiliser les données initiales
    const saved = localStorage.getItem("prospects");
    return saved ? JSON.parse(saved) : initialProspects;
  });

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("prospects", JSON.stringify(prospects));
  }, [prospects]);

  const handleAddProspect = (newProspect) => {
    const id = prospects.length > 0 ? Math.max(...prospects.map(p => p.id)) + 1 : 1;
    const prospectToAdd = {
      ...newProspect,
      id
    };
    setProspects([...prospects, prospectToAdd]);
  };

  return (
    <>
      {!isConnected && <Connexion onSuccess={() => setIsConnected(true)} />}

      {isConnected && view === "prospects" && (
        <Prospect
          setView={setView}
          setSelectedContactId={setSelectedContactId}
          prospects={prospects}
        />
      )}

      {isConnected && view === "clients" && (
        <Clients
          setView={setView}
          setSelectedContactId={setSelectedContactId}
          prospects={prospects}
        />
      )}

      {isConnected && view === "infocontact" && (
        <Infocontact setView={setView} idcontact={selectedContactId} prospects={prospects} />
      )}

      {isConnected && view === "ajouter-prospect" && (
        <AjouterProspect
          setView={setView}
          onAddProspect={handleAddProspect}
        />
      )}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
