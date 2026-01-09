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


  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost/crm/php/contacts.php");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Erreur fetch contacts :", err);
    }
  };

  const fetchStatus = async () => {
    try {
      const res = await fetch("http://localhost/crm/php/status.php");
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      console.error("Erreur fetch status :", err);
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await fetch("http://localhost/crm/php/admin.php");
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      console.error("Erreur fetch admins :", err);
    }
  };

  const fetchRdv = async () => {
    try {
      const res = await fetch("http://localhost/crm/php/rdv.php");
      const data = await res.json();
      setRdvList(data);
    } catch (err) {
      console.error("Erreur fetch RDV :", err);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchAdmins();
    fetchStatus();
    fetchRdv();
  }, []);


  const handleAddProspect = async (newProspect) => {
    try {
      const res = await fetch("http://localhost/crm/php/contacts.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProspect),
      });

      const text = await res.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.error("Erreur parse JSON :", e, text);
        throw new Error("Réponse PHP invalide JSON");
      }

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Erreur ajout prospect");
      }

      await fetchContacts();
      return result;
    } catch (err) {
      console.error("Erreur ajout prospect :", err);
      throw err;
    }
  };

  const handleUpdateProspect = (updatedProspect) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === updatedProspect.id ? { ...c, ...updatedProspect } : c
      )
    );
  };

  const handleDeleteProspect = async (id) => {
    try {
      const res = await fetch("http://localhost/crm/php/contacts.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!data.success) throw new Error("Erreur suppression");

      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };


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
      console.error("Erreur ajout RDV :", err);
      throw err;
    }
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
    } catch (err) {
      console.error(err);
    }
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
          onDeleteProspect={handleDeleteProspect}
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
        <AjouterProspect setView={setView} onAddProspect={handleAddProspect} />
      )}

      {isConnected && view === "edit-prospect" && (
        <Editcontact
          setView={setView}
          prospect={contacts.find((c) => c.id === selectedContactId)}
          onUpdateProspect={handleUpdateProspect}
          status={status}
        />
      )}


      {isConnected && view === "infocontact" && (
        <Infocontact
          setView={setView}
          idcontact={selectedContactId}
          prospects={contacts}
        />
      )}


      {isConnected && view === "rdv" && (
        <RdvList
          rdv={rdvList}
          contacts={contacts}
          onEditRdv={(r) => {
            setSelectedRdv(r);
            setView("edit-rdv");
          }}
          onDeleteRdv={handleDeleteRdv}
          setView={setView}
        />
      )}


      {(isConnected && (view === "ajouter-rdv" || view === "edit-rdv")) && (
        <AjouterRdv
          setView={setView}
          onAddRdv={view === "edit-rdv" ? handleUpdateRdv : handleAddRdv}
          contacts={contacts}
          rdv={selectedRdv}
        />
      )}
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
