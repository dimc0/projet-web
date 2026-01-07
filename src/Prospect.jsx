export  const prospects = [
  { id: 1, name: "Mael", email: "mael@example.com", phone: "0600000000", source: "Web", note: "Client intéressé par le produit A", status: "Client" },
  { id: 2, name: "Léa", email: "lea@example.com", phone: "0611111111", source: "Salon", note: "Demande de rappel dans 1 semaine", status: "Prospect" },
  { id: 3, name: "Julien", email: "julien@example.com", phone: "0622222222", source: "Email", note: "", status: "Client" },
  { id: 4, name: "Léa", email: "luc@example.com", phone: "0611156311", source: "Salon", note: "Demande de rappel dans 1 semaine", status: "Prospect" }
];
export function Prospect({ setView }) {

  return (

    <div>
      <div>
        <h1>Liste des prospects</h1>
        <button>Ajouter un prospect  </button>
        </div>
      

      <ul>
        {prospects
          .filter(prospect => prospect.status === "Prospect")
          .map(prospect => (
            <li key={prospect.id}>
              {prospect.name} - {prospect.email} - {prospect.phone} - {prospect.status}
            </li>
        ))}
      </ul>

      <button className="Clients" onClick={() => setView("clients")}>
        Clients
      </button>
    </div>
  );
}
