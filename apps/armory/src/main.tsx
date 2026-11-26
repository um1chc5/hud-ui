import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@hud-ui/ui/styles/tokens.css'
import '@hud-ui/ui/styles/hud.css'
import './armory.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
