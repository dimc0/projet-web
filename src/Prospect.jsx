import { useEffect, useState } from "react";

export function Prospect({ setView, setSelectedContactId }) {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/crm/php/contacts.php")
      .then(res => res.json())
      .then(data => {
        setProspects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur fetch :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Liste des prospects</h1>
      <ul>
        {prospects
          .filter(p => p.id_status === 1) // ici on filtre les "prospects"
          .map(prospect => (
            <li
              key={prospect.id}
              onClick={() => {
                setSelectedContactId(prospect.id);
                setView("infocontact");
              }}
            >
              {prospect.name} - {prospect.email} - {prospect.phone} ✏️
            </li>
          ))}
      </ul>
    </div>
  );
}
