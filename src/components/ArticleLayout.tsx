import type { PageProps } from '@parcel/rsc';
import type { ReactNode } from 'react';
import '../static/katex.css';
import '../client';
import Base from './Base';
import { ArticleExports } from '../util/article';

interface ArticleLayoutProps extends PageProps {
  children: ReactNode
}

export default function ArticleLayout({children, pages, currentPage}: ArticleLayoutProps) {
	const articleExports = ArticleExports.parse(currentPage.exports);
  return (
    <Base
      title={articleExports.metadata.title}
      description={articleExports.metadata.description}
      thumbnail={articleExports.metadata.thumbnail}
    >
    	<article className="prose dark:prose-invert pb-8">
     		{children}
     </article>
    </Base>
  );
}
