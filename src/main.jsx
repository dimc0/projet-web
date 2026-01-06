import { createRoot } from "react-dom/client"
import { useState } from "react"
import { Connexion } from "./Connexion"
import { Prospect } from "./Prospect"

function App() {
  const [isConnected, setIsConnected] = useState(false)

  return (
    <>
      {!isConnected && <Connexion onSuccess={() => setIsConnected(true)} />}
      {isConnected && <Prospect />}
    </>
  )
}

createRoot(document.getElementById("root")).render(<App />)
