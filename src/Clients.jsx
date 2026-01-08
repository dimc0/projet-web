export function Clients({ setView, setSelectedContactId, prospects = [] }) {
  return (
    <div>
      <h1>Liste des clients</h1>
      <ul>
        {prospects.map(c => (
          <li
            key={c.id}
            onClick={() => {
              setSelectedContactId(c.id);
              setView("infocontact");
            }}
          >
            {c.name}  -  {c.email}  -  {c.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}
