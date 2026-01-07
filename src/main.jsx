// import { createRoot } from "react-dom/client";
// import { useState } from "react";
// import { Connexion } from "./Connexion";
// import { Prospect } from "./Prospect";
// import { Infocontact } from "./Infocontact";
// import { AjouterProspect } from "./AjouterProspect";
// import { Nav } from "./Nav";
// // import { Clients } from "./Clients";

// function App() {
//   const [isConnected, setIsConnected] = useState(false);
//   const [view, setView] = useState("prospects");
//   const [selectedContactId, setSelectedContactId] = useState(null);

//   return (
//     <>
//       {!isConnected && <Connexion onSuccess={() => setIsConnected(true)} />}

//       {isConnected && <Nav setView={setView} />}

//       {isConnected && view === "prospects" && (
//         <Prospect setView={setView} setSelectedContactId={setSelectedContactId} />
//       )}

//       {isConnected && view === "infocontact" && (
//         <Infocontact
//           setView={setView}
//           idcontact={selectedContactId}
//         />
//       )}

//       {isConnected && view === "ajouter-prospect" && (
//         <AjouterProspect setView={setView} />
//       )}

//       {isConnected && view === "rdv" && (
//         <div>Rdv view not implemented yet</div>
//       )}
//     </>
//   );
// }

// const root = createRoot(document.getElementById("root"));
// root.render(<App />);


import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";

import { Connexion } from "./Connexion";
import { Prospect } from "./Prospect";
import { Infocontact } from "./Infocontact";
import { Nav } from "./Nav";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [view, setView] = useState("prospects");
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [prospects, setProspects] = useState([]);

  // Charger les contacts via fetch
  useEffect(() => {
    fetch("./../php/contacts.php")
      .then(res => res.json())
      .then(data => setProspects(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      {!isConnected && <Connexion onSuccess={() => setIsConnected(true)} />}

      {isConnected && <Nav setView={setView} />}

      {isConnected && view === "prospects" && (
        <Prospect
          setView={setView}
          setSelectedContactId={setSelectedContactId}
          prospects={prospects}
        />
      )}

      {isConnected && view === "infocontact" && (
        <Infocontact
          setView={setView}
          idcontact={selectedContactId}
          prospects={prospects}
        />
      )}

      {isConnected && view === "rdv" && <div>Page RDV non faite</div>}
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
