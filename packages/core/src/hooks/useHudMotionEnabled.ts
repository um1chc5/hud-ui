import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Returns `true` when motion is allowed in the HUD skin, i.e. when:
 *
 * 1. The user's OS does not request reduced motion, AND
 * 2. `data-hud-motion` on `<html>` is not `"off"`.
 *
 * Observes attribute changes on `<html>` via MutationObserver so the hook
 * reacts live when the user flips the motion toggle in the armory.
 */
export function useHudMotionEnabled(): boolean {
  const reducedMotion = usePrefersReducedMotion()
  const [attrOff, setAttrOff] = useState(false)

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    const read = () => setAttrOff(root.getAttribute('data-hud-motion') === 'off')
    read()
    const mo = new MutationObserver(read)
    mo.observe(root, { attributes: true, attributeFilter: ['data-hud-motion'] })
    return () => mo.disconnect()
  }, [])

  return !reducedMotion && !attrOff
}
