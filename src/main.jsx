import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import "./index.css";

import { Connexion } from "./Connexion";
import { Prospect } from "./Prospect";
import { Clients } from "./Clients";
import { AjouterProspect } from "./AjouterProspect";
import { Infocontact } from "./Infocontact";
import { Editcontact } from "./Editcontact";
import { Nav } from "./Nav";

import { AjouterRdv } from "./AjouterRdv";
import { RdvList } from "./Rdv";

export function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState("prospects"); 
  const [selectedContactId, setSelectedContactId] = useState(null);

  const [contacts, setContacts] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [status, setStatus] = useState([]);

  const [rdvList, setRdvList] = useState([]);
  const [selectedRdv, setSelectedRdv] = useState(null);

  // ================= FETCH =================
  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost/crm/php/contacts.php");
      const data = await res.json();
      setContacts(data);
    } catch (err) { console.error(err); }
  };

  const fetchStatus = async () => {
    try {
      const res = await fetch("http://localhost/crm/php/status.php");
      const data = await res.json();
      setStatus(data);
    } catch (err) { console.error(err); }
  };

  const fetchAdmins = async () => {
    try {
      const res = await fetch("http://localhost/crm/php/admin.php");
      const data = await res.json();
      setAdmins(data);
    } catch (err) { console.error(err); }
  };

  const fetchRdv = async () => {
    try {
      const res = await fetch("http://localhost/crm/php/rdv.php");
      const data = await res.json();
      setRdvList(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchContacts();
    fetchAdmins();
    fetchStatus();
    fetchRdv();
  }, []);

  // ================= GESTION RDV =================
  const handleAddRdv = async (newRdv) => {
    try {
      const res = await fetch("http://localhost/crm/php/rdv.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRdv),
      });
      const result = await res.json();
      if (!result.success) throw new Error("Erreur ajout RDV");
      await fetchRdv();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleDeleteRdv = async (id) => {
    try {
      const res = await fetch("http://localhost/crm/php/rdv.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (!result.success) throw new Error("Erreur suppression RDV");
      await fetchRdv();
    } catch (err) { console.error(err); }
  };

  const handleUpdateRdv = async (updatedRdv) => {
    try {
      const res = await fetch("http://localhost/crm/php/rdv.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRdv),
      });
      const result = await res.json();
      if (!result.success) throw new Error("Erreur mise à jour RDV");
      await fetchRdv();
      setSelectedRdv(null);
      setView("rdv");
    } catch (err) { console.error(err); }
  };

  const prospects = contacts.filter((c) => c.id_status === 1);
  const clients = contacts.filter((c) => c.id_status === 2);

  return (
    <>
      {!isConnected && (
        <Connexion
          listeadmin={admins}
          onSuccess={(admin) => {
            setIsConnected(true);
            setCurrentUser(admin);
          }}
        />
      )}

      {isConnected && (
        <Nav
          setView={setView}
          currentView={view}
          user={currentUser}
          setIsConnected={setIsConnected}
        />
      )}

      {isConnected && view === "prospects" && (
        <Prospect
          setView={setView}
          setSelectedContactId={setSelectedContactId}
          prospects={prospects}
          onDeleteProspect={() => {}}
        />
      )}

      {isConnected && view === "clients" && (
        <Clients
          setView={setView}
          setSelectedContactId={setSelectedContactId}
          prospects={clients}
        />
      )}

      {isConnected && view === "rdv" && (
        <RdvList
          rdv={rdvList}
          setView={setView}
          onEditRdv={(r) => { setSelectedRdv(r); setView("ajouter-rdv"); }}
          onDeleteRdv={handleDeleteRdv}
        />
      )}

      {isConnected && view === "ajouter-rdv" && (
        <AjouterRdv
          setView={setView}
          onAddRdv={handleAddRdv}
          contacts={contacts}
        />
      )}
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
