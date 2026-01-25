import type { PageProps } from "@parcel/rsc";
import type { ReactNode } from "react";
import "../static/katex.css";
import Base from "./Base";
import { ArticleExports } from "../util/article";
import { CommentSection } from "./Bluesky/CommentSection";
import { QueryProvider } from "./Bluesky/QueryProvider";

interface ArticleLayoutProps extends PageProps {
	children: ReactNode;
}

export default function ArticleLayout({
	children,
	currentPage,
}: ArticleLayoutProps) {
	const metadata = ArticleExports.parse(currentPage.exports).metadata;
	const date = new Date(metadata.date);
	const formattedDate = date.toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<Base title={metadata.title} description={metadata.description}>
			<article className="prose prose-figure:flex prose-figure:justify-center dark:prose-invert">
				<div>
					<h1 className="text-3xl mb-2">{metadata.title}</h1>
					<span>
						Published on{" "}
						<time className="font-semibold" dateTime={date.toDateString()}>
							{formattedDate}
						</time>
					</span>
				</div>
				{children}
			</article>
			{metadata.bskyPostId && (
				<section className="mt-4">
					<QueryProvider>
						<CommentSection bskyPostId={metadata.bskyPostId} />
					</QueryProvider>
				</section>
			)}
		</Base>
	);
}
