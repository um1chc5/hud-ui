export { cn } from './lib/utils'
export {
  HUD_PALETTES,
  HUD_ON_OFF,
  HUD_DURATIONS,
  HUD_CHAMFERS,
  HUD_SPACING,
  HUD_EASE,
  HUD_CSS_VARS,
  type HudPalette,
  type HudOnOff,
  type HudDurationKey,
  type HudChamferKey,
  type HudCssVar,
} from './lib/tokens'

export { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
export { useHudMotionEnabled } from './hooks/useHudMotionEnabled'

export { Dialog, type DialogProps } from './components/ui/Dialog'
export {
  Tabs,
  Tab,
  Item,
  SegmentedControl,
  type TabsProps,
  type TabKey,
  type TabOrientation,
  type SegmentedControlProps,
} from './components/ui/Tabs'
export { Toggle, type ToggleProps } from './components/ui/Toggle'
export { Meter, type MeterProps, type MeterVariant } from './components/ui/Meter'
export { TextScramble, type TextScrambleProps } from './components/ui/TextScramble'
export {
  useTextScramble,
  type TextScramblePhase,
  type UseTextScrambleOptions,
} from './components/ui/useTextScramble'
export { ScrollPanel, type ScrollPanelProps } from './components/ui/ScrollPanel'

export { CornerBrackets, type CornerBracketsProps } from './components/hud/CornerBrackets'
export { ChamferFrame, type ChamferFrameProps, type ChamferSize } from './components/hud/ChamferFrame'
export { GridBg, type GridBgProps } from './components/hud/GridBg'
