import type { PageProps } from "@parcel/rsc";
import { Feed } from "feed";
import { ArticleExports } from "../util/article";
import * as fs from "graceful-fs";
import Base from "../components/Base";

export default async function FeedPage({ pages, currentPage }: PageProps) {
	const year = new Date().getFullYear();
	const author = {
		name: "Micah Cantor",
		email: "hello@micahcantor.com",
	};
	const feed = new Feed({
		title: "Micah Cantor",
		description: "Micah Cantor's personal site",
		id: "https://www.micahcantor.com/atom.xml",
		copyright: `Micah Cantor, ${year}`,
		language: "en",
		author,
	});
	pages
		.filter((page) => page.url.includes("/blog/"))
		.forEach((page) => {
			const metadata = ArticleExports.parse(page.exports).metadata;
			feed.addItem({
				title: metadata.title,
				id: page.url,
				link: page.url,
				description: metadata.description,
				date: new Date(metadata.date),
				image: metadata.thumbnail,
				author: [author],
			});
		});
	await fs.writeFile("dist/atom.xml", feed.atom1());
	
	return (
		<Base title="Feed" description="feed">
			Feed located at <a className="underline" href="/atom.xml">/atom.xml</a>.
		</Base>
	)
}
