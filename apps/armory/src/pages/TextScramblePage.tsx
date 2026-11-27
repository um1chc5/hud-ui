import { useState } from 'react'
import { TextScramble, Toggle } from '@hud-ui/ui'
import textScrambleSource from '../../../../packages/ui/src/components/ui/TextScramble.tsx?raw'
import useTextScrambleSource from '../../../../packages/ui/src/components/ui/useTextScramble.ts?raw'
import { ComponentDocShell } from '../components/ComponentDocShell'

const USAGE_CODE = `import { TextScramble } from '@/components/ui/TextScramble'

export function BootHeader() {
  return <TextScramble as="h1" text="SYSTEM ONLINE" duration={900} />
}`

export function TextScramblePage() {
  return (
    <ComponentDocShell
      title="TextScramble"
      slug="text-scramble"
      category="UI Primitive"
      description="rAF glyph scramble toward final text. aria-label always holds the settled string. Reduced motion or data-hud-motion='off' renders the final string immediately."
      demo={<TextScrambleDemo />}
      usageCode={USAGE_CODE}
      sources={[
        { filename: 'components/ui/TextScramble.tsx', code: textScrambleSource },
        { filename: 'components/ui/useTextScramble.ts', code: useTextScrambleSource },
      ]}
      propsList={[
        {
          name: 'text',
          type: 'string',
          description: 'Final settled string and default aria-label.',
        },
        {
          name: 'duration',
          type: 'number',
          defaultValue: '800',
          description: 'Animation duration in milliseconds.',
        },
        {
          name: 'glyphs',
          type: 'string',
          description: 'Custom character pool used during scramble frames.',
        },
        {
          name: 'as',
          type: "'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'p'",
          defaultValue: "'span'",
          description: 'Rendered HTML element tag.',
        },
        {
          name: 'onDone',
          type: '() => void',
          description: 'Callback invoked once the scramble settles.',
        },
      ]}
      keyboardList={[
        {
          keys: '—',
          description: 'Decorative display text; screen readers hear the settled aria-label only.',
        },
      ]}
    />
  )
}

function TextScrambleDemo() {
  const [key, setKey] = useState(0)
  const [text, setText] = useState('SYSTEM ONLINE')

  return (
    <div className="flex flex-col gap-4">
      <div className="font-[family-name:var(--hud-font-mono)] text-xl">
        <TextScramble key={key} text={text} duration={900} />
      </div>
      <div className="flex flex-wrap gap-2">
        <Toggle
          isSelected={false}
          onChange={() => {
            setText('SYSTEM ONLINE')
            setKey((k) => k + 1)
          }}
        >
          Replay boot
        </Toggle>
        <Toggle
          isSelected={false}
          onChange={() => {
            setText('CHANNEL LOCKED')
            setKey((k) => k + 1)
          }}
        >
          Swap text
        </Toggle>
      </div>
    </div>
  )
}
