const CHINESE = /([⺀-⿿　-〿㐀-䶿一-鿿豈-﫿]+)/;

/**
 * Renders a sentence that may contain Chinese titles, marking those parts so
 * browsers pick the right characters and screen readers the right voice.
 */
export function Text({ children }: { children: string }) {
  return (
    <>
      {children.split(CHINESE).map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} lang="zh-Hans" className="han">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
