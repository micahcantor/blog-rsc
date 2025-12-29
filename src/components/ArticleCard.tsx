import { Page } from "@parcel/rsc";
import { ArticleExports } from "../util/article";
import { ArticleTag } from "./ArticleTag";

export interface ArticleCardProps {
	page: Page;
}

export function ArticleCard({ page }: ArticleCardProps) {
	const articleExports = ArticleExports.parse(page.exports);
	const date = new Date(articleExports.metadata.date);
	const formattedDate = date.toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	});

	return (
		<a href={page.url} className="w-full">
			<div className="w-full px-4 py-2 flex flex-col rounded-lg border shadow-sm hover:shadow-violet-300 dark:hover:shadow-violet-700 dark:bg-slate-800 dark:shadow-slate-700 border-slate-300 dark:border-slate-800">
				<div className="flex flex-col pb-1 lg:flex-row lg:justify-between lg:pt-1 lg:gap-2">
					<h2 className="font-medium text-lg">
						{articleExports.metadata.title}
					</h2>
					<time dateTime={date.toDateString()} className="text-sm text-nowrap">
						{formattedDate}
					</time>
				</div>
				<p className="pb-1.5">{articleExports.metadata.description}</p>
				<div className="flex flex-row space-x-2">
					{articleExports.metadata.tags.map((tag) => (
						<ArticleTag key={tag} value={tag} />
					))}
				</div>
			</div>
		</a>
	);
}
