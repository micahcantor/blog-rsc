import katex from 'katex';

interface MathBlockProps {
  tex: string,
  displayMode?: boolean,
}

export default function MathBlock({ tex, displayMode }: MathBlockProps) {
  const katexMarkup = { __html: katex.renderToString(tex, { displayMode }) };
  return (
    <span dangerouslySetInnerHTML={katexMarkup} />
  );
}
