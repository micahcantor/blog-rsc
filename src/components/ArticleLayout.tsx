import type { PageProps } from '@parcel/rsc';
import type { ReactNode } from 'react';
import * as z from 'zod';
import { Nav } from './Nav';
import '../static/katex.css';
import '../client';
import Base from './Base';

const Exports = z.object({
  metadata: z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.optional(z.string()),
    tags: z.array(z.string()),
  }),
});

interface ArticleLayoutProps extends PageProps {
  children: ReactNode
}

export default function ArticleLayout({children, pages, currentPage}: ArticleLayoutProps) {
  const exportsResult = Exports.safeParse(currentPage.exports);
  if (exportsResult.error) {
    throw new Error(`Error in exported metadata for page '${currentPage.name}':\n${z.prettifyError(exportsResult.error)}`);
  }

  const metadata = exportsResult.data.metadata;
  return (
    <Base
      title={metadata.title}
      description={metadata.description}
      thumbnail={metadata.thumbnail}
    >
      {children}
      <Nav pages={pages} currentPage={currentPage} />
    </Base>
  );
}
