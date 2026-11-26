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

export type TabOrientation = 'horizontal' | 'vertical'

/** The subset of `React.Key` react-aria accepts (excludes bigint). */
export type TabKey = string | number

export type TabsProps = {
  /** Accessible label (used when no visible heading is nearby). */
  'aria-label'?: string
  /** `<Item key="..." title="...">panel content</Item>` children. */
  children: ReactElement | ReactElement[]
  /** Controlled selected key. */
  selectedKey?: TabKey
  /** Default key before user interaction. */
  defaultSelectedKey?: TabKey
  onSelectionChange?: (key: TabKey) => void
  orientation?: TabOrientation
  isDisabled?: boolean
  disabledKeys?: Iterable<TabKey>
  /** Pass-through style for the root wrapper. */
  style?: CSSProperties
  id?: string
}

/**
 * Headless Tabs (ARIA Tabs pattern).
 *
 * Powered by react-aria / react-stately:
 *   - Roving tabindex, arrow-key navigation (respecting `orientation`).
 *   - Home / End to jump to first / last.
 *   - Automatic activation on focus.
 *
 * Data attributes (skins target these):
 *   - `[data-hud-tabs]` on the root wrapper.
 *   - `[data-hud-tab-list][data-orientation]` on the tablist.
 *   - `[data-hud-tab][data-selected="true"|"false"][data-focus-visible]` on tabs.
 *   - `[data-hud-tab-panel]` on the active panel.
 *
 * Consumer usage:
 * ```tsx
 * import { Tabs, Item } from '@hud-ui/core'
 *
 * <Tabs aria-label="Status" defaultSelectedKey="feed">
 *   <Item key="feed" title="Feed">...</Item>
 *   <Item key="log" title="Log">...</Item>
 * </Tabs>
 * ```
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(props, forwardedRef) {
  const { orientation = 'horizontal', style, id } = props
  // react-stately's `TabListStateOptions` takes a `CollectionChildren` shape
  // that fully-types each JSX `<Item>` child; our public API accepts the more
  // ergonomic `ReactElement | ReactElement[]`. Cast at the boundary — the
  // runtime contract is identical.
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
    <div ref={forwardedRef} data-hud-tabs="" style={style} id={id}>
      <div
        {...tabListProps}
        ref={listRef}
        data-hud-tab-list=""
        data-orientation={orientation}
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
  // `title` is the tab label; `children` is the panel body.
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
    <div {...tabPanelProps} ref={ref} data-hud-tab-panel="">
      {selectedProps.children}
    </div>
  )
}

export { Item }

/** Semantic alias for `<Item>`. */
export const Tab = Item

/** Familiar alias for segmented button groups — same component as `Tabs`. */
export const SegmentedControl = Tabs
export type SegmentedControlProps = TabsProps
