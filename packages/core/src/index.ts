/**
 * @hud-ui/core
 *
 * Headless React component library. No CSS, no classNames, no colours. Every
 * component exposes its state through data attributes and ARIA attributes so
 * a skin can style it from the outside.
 *
 * See `docs/RULES.md` in the repo root for the contract.
 */

export { Dialog, type DialogProps } from './dialog/Dialog'

export {
  Tabs,
  Tab,
  Item,
  SegmentedControl,
  type TabsProps,
  type TabKey,
  type TabOrientation,
  type SegmentedControlProps,
} from './tabs/Tabs'

export { Toggle, type ToggleProps } from './toggle/Toggle'

export { Meter, type MeterProps, type MeterVariant } from './meter/Meter'

export { TextScramble, type TextScrambleProps } from './text-scramble/TextScramble'
export {
  useTextScramble,
  type TextScramblePhase,
  type UseTextScrambleOptions,
} from './text-scramble/useTextScramble'

export { ScrollPanel, type ScrollPanelProps } from './scroll-panel/ScrollPanel'

export { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
export { useHudMotionEnabled } from './hooks/useHudMotionEnabled'
