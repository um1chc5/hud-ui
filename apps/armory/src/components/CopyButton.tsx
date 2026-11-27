import { useEffect, useState } from 'react'
import { cn } from '@hud-ui/ui'

type CopyButtonProps = {
  value: string
  label?: string
  className?: string
}

export function CopyButton({ value, label = 'Copy', className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      data-hud-copy-btn=""
      data-copied={copied ? 'true' : 'false'}
      aria-label={copied ? 'Copied to clipboard' : label}
      className={cn(
        'armory-btn armory-btn-sm shrink-0',
        copied && 'border-[var(--ok)] text-[var(--ok)]',
        className,
      )}
    >
      {copied ? 'COPIED' : label}
    </button>
  )
}
