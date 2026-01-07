import { createRoot } from "react-dom/client";
import { useState } from "react";
import { Connexion } from "./Connexion";
import { Prospect } from "./Prospect";
import { Clients } from "./Clients";
import { Infocontact } from "./Infocontact";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [view, setView] = useState("prospects");
  const [selectedContactId, setSelectedContactId] = useState(null);

  return (
    <>
      {!isConnected && <Connexion onSuccess={() => setIsConnected(true)} />}

      {isConnected && view === "prospects" && (
        <Prospect
          setView={setView}
          setSelectedContactId={setSelectedContactId}
        />
      )}

      {isConnected && view === "clients" && (
        <Clients
          setView={setView}
          setSelectedContactId={setSelectedContactId}
        />
      )}

      {isConnected && view === "infocontact" && (
        <Infocontact setView={setView} idcontact={selectedContactId} />
      )}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
