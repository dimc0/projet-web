export function Prospect() {
  const prospects = [
    {
      id: 1,
      name: "Mael",
      email: "mael@example.com",
      phone: "0600000000",
      source: "Web",
      note: "Client intéressé par le produit A",
      status: "Prospect"
    },
    {
      id: 2,
      name: "Léa",
      email: "lea@example.com",
      phone: "0611111111",
      source: "Salon",
      note: "Demande de rappel dans 1 semaine",
      status: "Prospect"
    },
    {
      id: 3,
      name: "Julien",
      email: "julien@example.com",
      phone: "0622222222",
      source: "Email",
      note: "",
      status: "Prospect"
    }
  ]

  return (
    <div>
      <h1>Liste des prospects</h1>
      <ul>
        {prospects.map((p) => (
          <li key={p.id}>
            {p.name} - {p.email} - {p.phone} -  {p.status}
          </li>
        ))}
      </ul>
    </div>
  )
}
