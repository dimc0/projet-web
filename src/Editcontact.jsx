import { useState } from "react";

export function Editcontact({ setView, prospect, onUpdateProspect }) {
  const [formData, setFormData] = useState({
    name: prospect.name || "",
    email: prospect.email || "",
    phone: prospect.phone || "",
    source: prospect.source || "Web",
    note: prospect.note || "",
    id_status: prospect.id_status || 1,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) return setError("Le nom est requis");
    if (!formData.email.trim()) return setError("L'email est requis");
    if (!formData.phone.trim()) return setError("Le téléphone est requis");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      return setError("L'email n'est pas valide");

    try {
      const res = await fetch("http://localhost/crm/php/contacts.php", {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: prospect.id }),
      });

      const data = await res.json();
      if (!data.success) throw new Error("Erreur serveur");

      setSuccess(true);
      if (onUpdateProspect) onUpdateProspect({ ...formData, id: prospect.id });

      setTimeout(() => setView("prospects"), 1000);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Éditer le prospect</h2>

      <input
        type="text"
        name="name"
        placeholder="Nom *"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email *"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Téléphone *"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <select name="source" value={formData.source} onChange={handleChange}>
        <option value="Web">Web</option>
        <option value="Salon">Salon</option>
        <option value="Email">Email</option>
        <option value="Réseaux sociaux">Réseaux sociaux</option>
        <option value="Recommandation">Recommandation</option>
        <option value="Autre">Autre</option>
      </select>

      <textarea
        name="note"
        placeholder="Note (optionnel)"
        value={formData.note}
        onChange={handleChange}
        rows="4"
      />

      {error && <p>{error}</p>}
      {success && <p>Prospect mis à jour !</p>}

      <div>
        <button type="button" onClick={() => setView("prospects")}>
          Annuler
        </button>
        <button type="submit">Enregistrer</button>
      </div>
    </form>
  );
}
