export function Nav({ setView }) {
  return (
    <nav>
      <div onClick={() => setView("prospects")}>Prospect</div>
      <div onClick={() => setView("clients")}>Clients</div>
      <div onClick={() => setView("rdv")}>Rdv</div>
    </nav>
  );
}
