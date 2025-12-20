import type { PageProps } from '@parcel/rsc';
import type { ReactNode } from 'react';
import { Code } from 'bright';
import * as z from 'zod';
import katex from 'katex';
import { Nav } from '../components/Nav';
import '../static/page.css';
import '../static/katex.css';
import '../client';

interface LayoutProps extends PageProps {
  children: ReactNode
}

interface CodeBlockProps {
  children: string,
  lang?: string,
  title?: string,
  lineNumbers?: boolean,
}

export function CodeBlock({children, lang, title, lineNumbers}: CodeBlockProps) {
  Code.theme = "github-dark";
  return <Code lang={lang} lineNumbers={lineNumbers} title={title}>
    {children}
  </Code>
}

interface MathBlockProps {
  tex: string,
  displayMode?: boolean,
}

export function MathBlock({ tex, displayMode }: MathBlockProps) {
  const katexMarkup = { __html: katex.renderToString(tex, { displayMode }) };
  return (
    <span id="katex-container" dangerouslySetInnerHTML={katexMarkup} />
  );
}

const Exports = z.object({
  title: z.string(),
  tags: z.array(z.string()),
});

export default function Layout({children, pages, currentPage}: LayoutProps) {
  const exportsResult = Exports.safeParse(currentPage.exports);
  if (exportsResult.error) {
    throw new Error("\n" + z.prettifyError(exportsResult.error));
  }

  return (
    <html lang="en">
      <head>
        <title>{exportsResult.data.title}</title>
      </head>
      <body>
        {children}
        <Nav pages={pages} currentPage={currentPage} />
      </body>
    </html>
  );
}
