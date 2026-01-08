export function Clients({ setView, setSelectedContactId, prospects = [] }) {
  return (
    <div>
      <h1>Liste des clients</h1>
      <ul>
        {prospects.map((client) => (
          <li
            key={client.id}
            onClick={() => {
              setSelectedContactId(client.id);
              setView("infocontact");
            }}
          >
            {client.name} - {client.email} - {client.phone}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedContactId(client.id);
                setView("edit-prospect");
              }}
            >
              ✏️
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onDeleteProspect) onDeleteProspect(client.id);
              }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
