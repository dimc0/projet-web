import { prospects as defaultProspects } from "./Prospect"

export function Clients({ setView, setSelectedContactId, prospects = [] }) {
  const displayProspects = prospects.length > 0 ? prospects : defaultProspects

  return (
    <div>
      <h1>Liste des clients</h1>

      <ul>
        {displayProspects
          .filter(p => p.status === "Client")
          .map(prospect => (
            <li
              key={prospect.id}
              onClick={() => {
                setSelectedContactId(prospect.id)
                setView("infocontact")
              }}
            >
              {prospect.name} - {prospect.email} - {prospect.phone} - {prospect.status}
            </li>
          ))}
      </ul>

      <button onClick={() => setView("prospects")}>Retour prospects</button>
    </div>
  )
}
