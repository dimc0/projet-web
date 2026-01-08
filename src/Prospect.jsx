export function Prospect({
  setView,
  setSelectedContactId,
  prospects = [],
  onDeleteProspect,
}) {
  return (
    <div>
      <h1>Liste des prospects</h1>
      <button onClick={() => setView("ajouter-prospect")}>
        Ajouter un prospect
      </button>
      <ul>
        {prospects.map((p) => (
          <li
            key={p.id}
            onClick={() => {
              setSelectedContactId(p.id);
              setView("infocontact");
            }}
          >
            {p.name} - {p.email} - {p.phone}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedContactId(p.id);
                setView("edit-prospect");
              }}
            >
              ✏️
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // empêche le clic de remonter au <li>
                if (onDeleteProspect) onDeleteProspect(p.id); // appelle la fonction passée depuis App
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
