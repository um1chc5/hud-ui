import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function readMotionAttrOff(): boolean {
  if (typeof document === 'undefined') return false
  return document.documentElement.getAttribute('data-hud-motion') === 'off'
}

/**
 * Returns `true` when HUD motion is allowed:
 * 1. OS does not request reduced motion, AND
 * 2. `data-hud-motion` on `<html>` is not `"off"`.
 */
export function useHudMotionEnabled(): boolean {
  const reducedMotion = usePrefersReducedMotion()
  const [attrOff, setAttrOff] = useState(readMotionAttrOff)

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
