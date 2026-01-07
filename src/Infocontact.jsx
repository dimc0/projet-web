// import { prospects as defaultProspects } from "./Prospect"

// export function Infocontact({ setView, idcontact, prospects = [] }) {
//   const displayProspects = prospects.length > 0 ? prospects : defaultProspects
//   const contact = displayProspects.find(p => p.id === idcontact)

//   if (!contact) {
//     return <h2>Contact introuvable</h2>
//   }

//   return (
//     <div>
//       <h1>Informations du contact</h1>

//       <p>Nom : {contact.name}</p>
//       <p>Email : {contact.email}</p>
//       <p>Téléphone : {contact.phone}</p>
//       <p>Source : {contact.source}</p>
//       <p>Note : {contact.note}</p>
//       <p>Status : {contact.status}</p>
//       <div> ✏️</div>

//       <button onClick={() => setView("prospects")}>
//         Retour
//       </button>
//     </div>
//   )
// }

export function Infocontact({ setView, idcontact, prospects }) {

  const contact = prospects.find(p => p.id === idcontact);

  if (!contact) {
    return <h2>Contact introuvable</h2>;
  }

  return (
    <div>
      <h1>Informations du contact</h1>

      <p>Nom : {contact.name}</p>
      <p>Email : {contact.email}</p>
      <p>Téléphone : {contact.phone}</p>
      <p>Source : {contact.source}</p>
      <p>Note : {contact.note}</p>
      <p>Status : {contact.status}</p>

      <button onClick={() => setView("prospects")}>
        Retour
      </button>
    </div>
  );
}


