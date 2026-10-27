import { CodeXml } from "lucide-react";
import { Fragment } from "react";

export type CodeTokenKind =
  "keyword" | "string" | "number" | "comment" | "punctuation" | "plain";

export type CodeToken = { kind: CodeTokenKind; text: string };
export type CodeLine = CodeToken[];

const tokenColors: Record<CodeTokenKind, string> = {
  keyword: "text-code-keyword",
  string: "text-code-string",
  number: "text-code-number",
  comment: "text-code-comment",
  punctuation: "text-code-punctuation",
  plain: "text-text",
};

type CodeCardProps = {
  fileName: string;
  language: string;
  lines: CodeLine[];
  /** Accessible name for the figure. */
  label: string;
};

export function CodeCard({ fileName, language, lines, label }: CodeCardProps) {
  return (
    <figure
      aria-label={label}
      className="overflow-hidden rounded-card border border-border bg-surface"
    >
      <figcaption className="flex h-11 items-center justify-between gap-3 border-b border-border px-3">
        <span className="inline-flex items-center gap-1.5 rounded-chip bg-surface-2 px-2.5 py-1 font-mono text-tag text-text">
          <CodeXml
            aria-hidden
            className="size-3.5 text-accent"
            strokeWidth={1.8}
          />
          {fileName}
        </span>
        <span className="font-mono text-tag text-muted">{language}</span>
      </figcaption>
      <pre className="overflow-x-auto p-5 font-mono text-code-sm whitespace-pre-wrap xs:p-6 xs:text-code xs:whitespace-pre">
        <code>
          {lines.map((line, i) => (
            <Fragment key={i}>
              {line.map((token, j) => (
                <span key={j} className={tokenColors[token.kind]}>
                  {token.text}
                </span>
              ))}
              {i < lines.length - 1 && "\n"}
            </Fragment>
          ))}
        </code>
      </pre>
    </figure>
  );
}
