export function Prospect({ setView, setSelectedContactId, prospects = [] }) {
  return (
    <div>
      <h1>Liste des prospects</h1>
      <button onClick={() => setView("ajouter-prospect")}>Ajouter un prospect</button>
      <ul>
        {prospects.map(p => (
          <li
            key={p.id}
            onClick={() => {
              setSelectedContactId(p.id);
              setView("infocontact");
            }}
          >
            {p.name} - {p.email} - {p.phone} ✏️
          </li>
        ))}
      </ul>
    </div>
  );
}
