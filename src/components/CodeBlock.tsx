import { Code } from 'bright';

interface CodeBlockProps {
  children: string,
  lang?: string,
  title?: string,
  lineNumbers?: boolean,
}

export default function CodeBlock({children, lang, title, lineNumbers}: CodeBlockProps) {
  Code.theme = "github-dark";
  return <Code lang={lang} lineNumbers={lineNumbers} title={title}>
    {children}
  </Code>
}
