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
		<div className="w-full flex flex-col">
			<a href={page.url} className="w-full">
				<div className="w-full px-4 py-2 flex flex-col rounded-lg rounded-b-none border border-slate-300 dark:border-slate-700 active:bg-slate-200 dark:active:bg-slate-700 dark:bg-slate-800">
					<div className="flex flex-col pb-1 lg:flex-row lg:justify-between lg:pt-1 lg:gap-2">
						<h2 className="font-medium text-lg">
							{articleExports.metadata.title}
						</h2>
						<time dateTime={date.toDateString()} className="text-sm text-nowrap">
							{formattedDate}
						</time>
					</div>
					<p>{articleExports.metadata.description}</p>
				</div>
			</a>
			<div className="flex flex-row py-2 px-3 space-x-2 rounded-b-lg border border-t-0 border-slate-300 dark:border-slate-700 dark:bg-slate-800">
				{articleExports.metadata.tags.map((tag) => (
					<ArticleTag key={tag} value={tag} />
				))}
			</div>
		</div>
	);
}
