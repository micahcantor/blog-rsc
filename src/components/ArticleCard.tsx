import { Page } from "@parcel/rsc";
import { ArticleExports } from "../util/article";
import { ArticleTag } from "./ArticleTag";

export interface ArticleCardProps {
	page: Page,
}

export function ArticleCard({ page }: ArticleCardProps) {
	const articleExports = ArticleExports.parse(page.exports);
	return (
		<a href={page.url}>
			<div className="flex flex-col">
				<h2 className="font-medium text-lg">{articleExports.metadata.title}</h2>
				<p>{articleExports.metadata.description}</p>
				<div className="flex flex-row space-x-2">
					{articleExports.metadata.tags.map((tag) => (
						<ArticleTag key={tag} value={tag} />
					))}
				</div>
			</div>
		</a>
	)
}