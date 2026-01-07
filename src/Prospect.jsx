export const prospects = [
  { id: 1, name: "Mael", email: "mael@example.com", phone: "0600000000", source: "Web", note: "Client intéressé par le produit A", status: "Client" },
  { id: 2, name: "Léa", email: "lea@example.com", phone: "0611111111", source: "Salon", note: "Demande de rappel dans 1 semaine", status: "Prospect" },
  { id: 3, name: "Julien", email: "julien@example.com", phone: "0622222222", source: "Email", note: "", status: "Client" },
  { id: 4, name: "Léa", email: "luc@example.com", phone: "0611156311", source: "Salon", note: "Demande de rappel dans 1 semaine", status: "Prospect" }
]

export function Prospect({ setView, setSelectedContactId }) {
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
                setSelectedContactId(prospect.id)
                setView("infocontact")
              }}
            >
              <div>
                {prospect.name} - {prospect.email} - {prospect.phone} - {prospect.status}
              </div>
              
            </li>
          ))}
      </ul>

      <button onClick={() => setView("clients")}>Clients</button>
    </div>
  )
}
