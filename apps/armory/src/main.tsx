import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@hud-ui/tokens/styles.css'
import '@hud-ui/skin-hud/styles.css'
import '@hud-ui/skin-plain/styles.css'
import './armory.css'
import { App } from './App'

const container = document.getElementById('root')
if (!container) throw new Error('#root not found')
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
