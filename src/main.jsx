import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";

import { Connexion } from "./Connexion";
import { Prospect } from "./Prospect";
import { Clients } from "./Clients";
import { AjouterProspect } from "./AjouterProspect";
import { Infocontact } from "./Infocontact";
import { Nav } from "./Nav";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [view, setView] = useState("prospects");
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [admins, setAdmins] = useState([]);

  // ⚡ Récupération des contacts depuis PHP
  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost/crm/php/contacts.php");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Erreur fetch contacts :", err);
    }
  };

  // ⚡ Récupération des admins depuis PHP
  const fetchAdmins = async () => {
    try {
      const res = await fetch("http://localhost/crm/php/admin.php");
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      console.error("Erreur fetch admins :", err);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchAdmins();
  }, []);

  // ⚡ Ajouter un prospect côté React ET PHP
  const handleAddProspect = async (newProspect) => {
    try {
      const res = await fetch("http://localhost/crm/php/contacts.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProspect),
      });

      const result = await res.json();
      if (result.success) {
        // On récupère l'id automatiquement si tu veux gérer ça côté React
        const nextId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
        setContacts(prev => [...prev, { ...newProspect, id: nextId, id_status: 1 }]);
      } else {
        console.error("Erreur serveur :", result);
      }
    } catch (err) {
      console.error("Erreur fetch POST :", err);
    }
  };

  const prospects = contacts.filter(c => c.id_status === 1);
  const clients = contacts.filter(c => c.id_status === 2);

  return (
    <>
      {!isConnected && <Connexion onSuccess={() => setIsConnected(true)} listeadmin={admins} />}
      {isConnected && <Nav setView={setView} />}

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
          prospects={clients}
        />
      )}

      {isConnected && view === "ajouter-prospect" && (
        <AjouterProspect
          setView={setView}
          onAddProspect={handleAddProspect}
        />
      )}

      {isConnected && view === "infocontact" && (
        <Infocontact
          setView={setView}
          idcontact={selectedContactId}
          prospects={contacts}
        />
      )}

      {isConnected && view === "rdv" && <div>Page RDV non faite</div>}
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
