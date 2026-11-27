import {
  Children,
  forwardRef,
  isValidElement,
  useMemo,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cn } from '../../lib/utils'

export type TabOrientation = 'horizontal' | 'vertical'
export type TabKey = string | number

export type TabsItemProps = {
  title?: ReactNode
  children?: ReactNode
  isDisabled?: boolean
}

export function Item(_props: TabsItemProps): ReactElement | null {
  return null
}

export type TabsProps = {
  'aria-label'?: string
  children: ReactElement | ReactElement[]
  selectedKey?: TabKey
  defaultSelectedKey?: TabKey
  onSelectionChange?: (key: TabKey) => void
  orientation?: TabOrientation
  isDisabled?: boolean
  disabledKeys?: Iterable<TabKey>
  className?: string
  style?: CSSProperties
  id?: string
}

type ParsedItem = {
  key: TabKey
  title: ReactNode
  content: ReactNode
  disabled: boolean
}

function normalizeReactKey(rawKey: string | null, index: number): TabKey {
  if (rawKey === null) return index
  return rawKey.startsWith('.$') ? rawKey.slice(2) : rawKey
}

/**
 * Accessible Tabs — powered by Base UI Tabs with roving tabindex, arrow keys,
 * and chamfered active state.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    'aria-label': ariaLabel,
    children,
    selectedKey,
    defaultSelectedKey,
    onSelectionChange,
    orientation = 'horizontal',
    isDisabled = false,
    disabledKeys,
    className,
    style,
    id,
  },
  forwardedRef,
) {
  const disabledSet = useMemo(() => new Set<TabKey>(disabledKeys ?? []), [disabledKeys])

  const items = useMemo<ParsedItem[]>(() => {
    const out: ParsedItem[] = []
    Children.forEach(children, (child, index) => {
      if (!isValidElement<TabsItemProps>(child)) return
      const key = normalizeReactKey(child.key, index)
      out.push({
        key,
        title: child.props.title ?? key,
        content: child.props.children,
        disabled: isDisabled || Boolean(child.props.isDisabled) || disabledSet.has(key),
      })
    })
    return out
  }, [children, isDisabled, disabledSet])

  const firstEnabledKey = items.find((i) => !i.disabled)?.key ?? items[0]?.key

  return (
    <BaseTabs.Root
      ref={forwardedRef}
      id={id}
      style={style}
      data-hud-tabs=""
      value={selectedKey}
      defaultValue={selectedKey === undefined ? (defaultSelectedKey ?? firstEnabledKey) : undefined}
      orientation={orientation}
      onValueChange={(nextValue) => {
        if (nextValue !== null && nextValue !== undefined) {
          onSelectionChange?.(nextValue as TabKey)
        }
      }}
      className={cn('flex flex-col gap-3', className)}
    >
      <BaseTabs.List
        aria-label={ariaLabel}
        activateOnFocus={true}
        data-hud-tab-list=""
        data-orientation={orientation}
        className={cn('flex flex-wrap gap-2', orientation === 'vertical' && 'flex-col items-start')}
      >
        {items.map((item) => (
          <BaseTabs.Tab
            key={String(item.key)}
            value={item.key}
            disabled={item.disabled}
            render={(renderProps, state) => (
              <button
                {...renderProps}
                type="button"
                data-hud-tab=""
                data-selected={state.active ? 'true' : 'false'}
                data-disabled={state.disabled ? 'true' : 'false'}
                className={cn(
                  'cursor-pointer appearance-none border border-[var(--line)] bg-transparent',
                  'px-4 py-2 font-[family-name:var(--hud-font-mono)] text-xs uppercase tracking-[0.14em]',
                  'text-[var(--muted)] hover:border-[var(--accent-d)] hover:text-[var(--ink)]',
                  state.active &&
                    'border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)] hover:border-[var(--accent)] hover:text-[var(--on-accent)]',
                  state.disabled && 'cursor-not-allowed opacity-40',
                )}
              >
                {item.title}
              </button>
            )}
          />
        ))}
      </BaseTabs.List>
      {items.map((item) => (
        <BaseTabs.Panel
          key={String(item.key)}
          value={item.key}
          data-hud-tab-panel=""
          className="py-3 text-[var(--ink)]"
        >
          {item.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  )
})

export const Tab = Item
export const SegmentedControl = Tabs
export type SegmentedControlProps = TabsProps
