import type { ProseBlock } from "../lib/blocks";

export function Prose({ blocks }: { blocks: ProseBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p
                key={i}
                className="body article-p"
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );
          case "h2":
            return (
              <h2 key={i} className="h3 article-h2">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="article-h3">
                {block.text}
              </h3>
            );
          case "list":
            return (
              <ul key={i} className="article-list">
                {block.items.map((it, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: it }} />
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="article-quote"
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );
          case "code":
            return (
              <pre key={i} className="article-code" data-lang={block.lang}>
                <code>{block.code}</code>
              </pre>
            );
        }
      })}
    </>
  );
}
