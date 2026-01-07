import { createRoot } from "react-dom/client"
import { useState } from "react"
import { Connexion } from "./Connexion"
import { Prospect } from "./Prospect"
import { Clients } from "./Clients"

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [view, setView] = useState("prospects") 

  return (
    <>
      {!isConnected && (
        <Connexion onSuccess={() => setIsConnected(true)} />
      )}

      {isConnected && view === "prospects" && (
        <Prospect setView={setView} />
      )}

      {isConnected && view === "clients" && (
        <Clients setView={setView} />
      )}
    </>
  )
}

createRoot(document.getElementById("root")).render(<App />)
