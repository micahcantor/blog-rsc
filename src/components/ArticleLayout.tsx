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
	const date = new Date(articleExports.metadata.date);
	const formattedDate = date.toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
  return (
    <Base
      title={articleExports.metadata.title}
      description={articleExports.metadata.description}
      thumbnail={articleExports.metadata.thumbnail}
    >
    	<article className="prose prose-figure:flex prose-figure:justify-center dark:prose-invert">
     		<div>
 					<h1 className="text-3xl mb-2">{articleExports.metadata.title}</h1>
      		<span>
        		Published on {" "}<time className="font-semibold" dateTime={date.toDateString()}>{formattedDate}</time>
        	</span>
    			
       	</div>
     		{children}
     </article>
    </Base>
  );
}
