import { CopyButton } from './CopyButton'

type CodeBlockProps = {
  code: string
  title?: string
  lang?: string
  maxHeight?: number
}

export function CodeBlock({ code, title, lang = 'tsx', maxHeight = 420 }: CodeBlockProps) {
  return (
    <div className="armory-codeblock">
      <div className="armory-codeblock-head">
        <span className="armory-codeblock-meta">
          {title ? <span>{title}</span> : null}
          <span className="armory-codeblock-lang">{lang}</span>
        </span>
        <CopyButton value={code} label="COPY" />
      </div>
      <pre className="armory-codeblock-pre" style={{ maxHeight }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}
