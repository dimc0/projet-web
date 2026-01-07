import { prospects } from "./Prospect"

export function Clients({ setView, setSelectedContactId }) {
  return (
    <div>
      <h1>Liste des clients</h1>

      <ul>
        {prospects
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
