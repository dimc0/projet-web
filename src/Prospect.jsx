


// // // export const prospects = [
// // //   { id: 1, name: "Mael", email: "mael@example.com", phone: "0600000000", source: "Web", note: "Client intéressé par le produit A", status: "Client" },
// // //   { id: 2, name: "Léa", email: "lea@example.com", phone: "0611111111", source: "Salon", note: "Demande de rappel dans 1 semaine", status: "Prospect" },
// // //   { id: 3, name: "Julien", email: "julien@example.com", phone: "0622222222", source: "Email", note: "", status: "Client" },
// // //   { id: 4, name: "Léa", email: "luc@example.com", phone: "0611156311", source: "Salon", note: "Demande de rappel dans 1 semaine", status: "Prospect" }
// // // ]

// // export function Prospect({ setView, setSelectedContactId, prospects: propsProspects = [] }) {
// //   const displayProspects = propsProspects.length > 0 ? propsProspects : prospects

// //   return (
// //     <div>
// //       <h1>Liste des prospects</h1>

// //       <button 
// //         onClick={() => setView("ajouter-prospect")}
// //         style={{ 
// //           marginBottom: "1rem",
// //           background: "#10b981",
// //           color: "white"
// //         }}
// //       >
// //         + Ajouter un prospect
// //       </button>

// //       <ul>
// //         {displayProspects
// //           .filter(p => p.status === "Prospect")
// //           .map(prospect => (
// //             <li
// //               key={prospect.id}
// //               onClick={() => {
// //                 setSelectedContactId(prospect.id)
// //                 setView("infocontact")
// //               }}
// //             >
// //               <div>
// //                 {prospect.name} - {prospect.email} - {prospect.phone} - {prospect.status} 
                
// //               </div>
              
// //             </li>
// //           ))}
// //       </ul>
// //     </div>
// //   )
// // }

// // ⛔️ BONUS : vérifie bien que tu n'as pas d'autres imports plus bas dans le fichier !!

// import { useEffect, useState } from "react";

// export function Prospect({ setView, setSelectedContactId }) {
//   const [prospects, setProspects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost/contacts.php")
//       .then(res => res.json())
//       .then(data => {
//         setProspects(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Liste des prospects</h1>

//       <button
//         onClick={() => setView("ajouter-prospect")}
//         style={{
//           marginBottom: "1rem",
//           background: "#10b981",
//           color: "white"
//         }}
//       >
//         + Ajouter un prospect
//       </button>

//       <ul>
//         {prospects
//           .filter(p => p.status === "Prospect")
//           .map(prospect => (
//             <li
//               key={prospect.id}
//               onClick={() => {
//                 setSelectedContactId(prospect.id);
//                 setView("infocontact");
//               }}
//             >
//               {prospect.name} - {prospect.email} - {prospect.phone}
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

export function Prospect({ setView, setSelectedContactId, prospects }) {
  
  return (
    <div>
      <h1>Liste des prospects</h1>

      <ul>
        {prospects
          .filter(p => p.status === "Prospect")
          .map(prospect => (
            <li
              key={prospect.id}
              onClick={() => {
                setSelectedContactId(prospect.id);
                setView("infocontact");
              }}
            >
              {prospect.name} - {prospect.email} - {prospect.phone}
            </li>
          ))}
      </ul>
    </div>
  );
}
