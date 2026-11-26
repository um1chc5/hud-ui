import { useCallback, useEffect, useState } from 'react'
import { HUD_PALETTES, type HudPalette, type HudSkin, type HudOnOff } from '@hud-ui/tokens'

const KEY = 'hud-ui:armory:appearance:v1'

export type Appearance = {
  skin: HudSkin
  palette: HudPalette
  glow: HudOnOff
  motion: HudOnOff
}

const DEFAULTS: Appearance = {
  skin: 'hud',
  palette: 'steel',
  glow: 'on',
  motion: 'on',
}

function load(): Appearance {
  if (typeof localStorage === 'undefined') return DEFAULTS
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULTS
    const parsed = JSON.parse(raw) as Partial<Appearance>
    return {
      skin: parsed.skin === 'plain' ? 'plain' : 'hud',
      palette: (HUD_PALETTES as readonly string[]).includes(parsed.palette ?? '')
        ? (parsed.palette as HudPalette)
        : 'steel',
      glow: parsed.glow === 'off' ? 'off' : 'on',
      motion: parsed.motion === 'off' ? 'off' : 'on',
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
    root.setAttribute('data-skin', appearance.skin)
    root.setAttribute('data-hud-palette', appearance.palette)
    root.setAttribute('data-hud-glow', appearance.glow)
    root.setAttribute('data-hud-motion', appearance.motion)
    // Grid only makes sense in the hud skin.
    root.setAttribute('data-hud-grid', appearance.skin === 'hud' ? 'on' : 'off')
    try {
      localStorage.setItem(KEY, JSON.stringify(appearance))
    } catch {
      /* ignore quota / privacy errors */
    }
  }, [appearance])

  const update = useCallback(<K extends keyof Appearance>(key: K, value: Appearance[K]) => {
    setAppearance((prev) => ({ ...prev, [key]: value }))
  }, [])

  return { appearance, update }
}
