import { useCallback, useEffect, useState } from 'react'
import { HUD_PALETTES, type HudPalette, type HudOnOff } from '@hud-ui/ui'

const KEY = 'hud-ui:armory:appearance:v2'

export type Appearance = {
  palette: HudPalette
  glow: HudOnOff
  motion: HudOnOff
  grid: HudOnOff
}

const DEFAULTS: Appearance = {
  palette: 'steel',
  glow: 'on',
  motion: 'on',
  grid: 'on',
}

function load(): Appearance {
  if (typeof localStorage === 'undefined') return DEFAULTS
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULTS
    const parsed = JSON.parse(raw) as Partial<Appearance>
    return {
      palette: (HUD_PALETTES as readonly string[]).includes(parsed.palette ?? '')
        ? (parsed.palette as HudPalette)
        : 'steel',
      glow: parsed.glow === 'off' ? 'off' : 'on',
      motion: parsed.motion === 'off' ? 'off' : 'on',
      grid: parsed.grid === 'off' ? 'off' : 'on',
    }
  } catch {
    return DEFAULTS
  }
}

export function useAppearance() {
  const [appearance, setAppearance] = useState<Appearance>(DEFAULTS)

  useEffect(() => {
    setAppearance(load())
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-hud-palette', appearance.palette)
    root.setAttribute('data-hud-glow', appearance.glow)
    root.setAttribute('data-hud-motion', appearance.motion)
    root.setAttribute('data-hud-grid', appearance.grid)
    try {
      localStorage.setItem(KEY, JSON.stringify(appearance))
    } catch {
      /* ignore */
    }
  }, [appearance])

  const update = useCallback(<K extends keyof Appearance>(key: K, value: Appearance[K]) => {
    setAppearance((prev) => ({ ...prev, [key]: value }))
  }, [])

  return { appearance, update }
}
