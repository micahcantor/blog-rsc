import { Page } from "@parcel/rsc";
import { ArticleCard } from "./ArticleCard";

export interface ArticleNavProps {
	pages: Page[],
}

export function ArticleNav({ pages }: ArticleNavProps) {
	const blogPages = pages.filter((page) => page.url.includes("/blog/"));
	return (
		<nav className="flex gap-2">
			{blogPages.map((page) => <ArticleCard key={page.url} page={page} />)}
		</nav>
	)
}