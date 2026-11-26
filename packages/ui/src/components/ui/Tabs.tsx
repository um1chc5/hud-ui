import {
  forwardRef,
  useMemo,
  useRef,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react'
import { Item, useTabListState, type TabListStateOptions } from 'react-stately'
import { useFocusRing, useTab, useTabList, useTabPanel } from 'react-aria'
import type { Node } from 'react-stately'
import { cn } from '../../lib/utils'

export type TabOrientation = 'horizontal' | 'vertical'
export type TabKey = string | number

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

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(props, forwardedRef) {
  const { orientation = 'horizontal', style, id, className } = props
  const normalizedProps = useMemo(
    () =>
      ({
        ...props,
        selectionMode: 'single',
        children: props.children,
      }) as unknown as TabListStateOptions<object>,
    [props],
  )
  const state = useTabListState(normalizedProps)
  const listRef = useRef<HTMLDivElement>(null)
  const { tabListProps } = useTabList({ ...normalizedProps, orientation }, state, listRef)
  const items = [...state.collection] as Node<object>[]

  return (
    <div
      ref={forwardedRef}
      data-hud-tabs=""
      id={id}
      style={style}
      className={cn('flex flex-col gap-3', className)}
    >
      <div
        {...tabListProps}
        ref={listRef}
        data-hud-tab-list=""
        data-orientation={orientation}
        className={cn(
          'flex flex-wrap gap-2',
          orientation === 'vertical' && 'flex-col items-start',
        )}
      >
        {items.map((item) => (
          <TabButton key={item.key} item={item} state={state} />
        ))}
      </div>
      {state.selectedItem ? <TabPanel key={state.selectedItem.key} state={state} /> : null}
    </div>
  )
})

type TabState = ReturnType<typeof useTabListState>

function TabButton({ item, state }: { item: Node<object>; state: TabState }) {
  const ref = useRef<HTMLDivElement>(null)
  const { tabProps, isSelected, isDisabled } = useTab({ key: item.key }, state, ref)
  const { isFocusVisible, focusProps } = useFocusRing()
  const itemProps = item.props as { title?: ReactNode }
  const label = itemProps.title ?? (item.rendered as ReactNode)
  return (
    <div
      {...tabProps}
      {...focusProps}
      ref={ref}
      data-hud-tab=""
      data-selected={isSelected ? 'true' : 'false'}
      data-disabled={isDisabled ? 'true' : 'false'}
      data-focus-visible={isFocusVisible ? 'true' : 'false'}
      className={cn(
        'cursor-pointer appearance-none border border-[var(--line)] bg-transparent',
        'px-4 py-2 font-[family-name:var(--hud-font-mono)] text-xs uppercase tracking-[0.14em]',
        'text-[var(--muted)] hover:border-[var(--accent-d)] hover:text-[var(--ink)]',
        isSelected &&
          'border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)] hover:border-[var(--accent)] hover:text-[var(--on-accent)]',
        isDisabled && 'cursor-not-allowed opacity-40',
      )}
    >
      {label}
    </div>
  )
}

function TabPanel({ state }: { state: TabState }) {
  const ref = useRef<HTMLDivElement>(null)
  const { tabPanelProps } = useTabPanel({}, state, ref)
  const selected = state.selectedItem as Node<object> | null | undefined
  const selectedProps = (selected?.props ?? {}) as { children?: ReactNode }
  return (
    <div
      {...tabPanelProps}
      ref={ref}
      data-hud-tab-panel=""
      className="py-3 text-[var(--ink)]"
    >
      {selectedProps.children}
    </div>
  )
}

export { Item }
export const Tab = Item
export const SegmentedControl = Tabs
export type SegmentedControlProps = TabsProps
