import { useState } from "react"
import "./assets/connexion.css"

export function AjouterProspect({ setView, onAddProspect }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "Web",
    note: "",
    status: "Prospect"
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.name.trim()) {
      setError("Le nom est requis")
      return
    }
    if (!formData.email.trim()) {
      setError("L'email est requis")
      return
    }
    if (!formData.phone.trim()) {
      setError("Le téléphone est requis")
      return
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("L'email n'est pas valide")
      return
    }

    // Ajouter le prospect
    if (onAddProspect) {
      onAddProspect(formData)
    }

    setSuccess(true)
    
    setTimeout(() => {
      setView("prospects")
    }, 1000)
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2 style={{ marginTop: 0, marginBottom: "1rem", color: "#1a1a1a" }}>Ajouter un prospect</h2>

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
          placeholder="Téléphone "
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="status"
          name="status"
          placeholder="Status *"
          onChange={handleChange}
          required
        />

        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
        >
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

        {error && <p className="error">{error}</p>}
        
        {success && (
          <p style={{ color: "#10b981", margin: 0 }}>Prospect ajouté avec succès !</p>
        )}

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <button 
            type="button" 
            onClick={() => setView("prospects")}
            style={{ 
              background: "#6b7280",
              flex: 1
            }}
          >
            Annuler
          </button>
          <button type="submit" style={{ flex: 1 }}>
            Ajouter
          </button>
        </div>
      </form>
    </div>
  )
}

