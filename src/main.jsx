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

  // ==========================
  // FETCH CONTACTS
  // ==========================
  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost/crm/php/contacts.php");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Erreur fetch contacts :", err);
    }
  };

  // ==========================
  // FETCH ADMINS
  // ==========================
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

  // ==========================
  // ADD PROSPECT
  // ==========================
  const handleAddProspect = async (newProspect) => {
    try {
      const res = await fetch("http://localhost/crm/php/contacts.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProspect),
      });

      // DEBUG : voir ce que PHP renvoie exactement
      const text = await res.text();
      console.log("Réponse brute PHP :", text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.error("Erreur parse JSON :", e, text);
        throw new Error("Réponse PHP invalide JSON");
      }

      if (!res.ok || !result.success) {
        console.error("Erreur serveur :", result);
        throw new Error(result.message || "Erreur ajout prospect");
      }

      // 🔄 Rafraîchissement automatique de la liste après ajout
      await fetchContacts();
      return result;

    } catch (err) {
      console.error("Erreur ajout prospect :", err);
      throw err;
    }
  };

  const prospects = contacts.filter(c => c.id_status === 1);
  const clients = contacts.filter(c => c.id_status === 2);

  return (
    <>
      {!isConnected && (
        <Connexion
          onSuccess={() => setIsConnected(true)}
          listeadmin={admins}
        />
      )}

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
