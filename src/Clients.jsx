import {prospects} from "./Prospect";

export function Clients({ setView }) {
  return (
    <div>
      <h1>Liste des clients</h1>

      <ul>
        {prospects
          .filter((prospect) => prospect.status === "Client")
          .map((prospect) => (
            <li key={prospect.id}>
              {prospect.name} - {prospect.email} - {prospect.phone} -{" "}
              {prospect.status}
            </li>
          ))}
      </ul>

      <button onClick={() => setView("prospects")}>Retour prospects</button>
    </div>
  );
}
