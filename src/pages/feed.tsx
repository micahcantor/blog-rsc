import type { PageProps } from "@parcel/rsc";
import { Feed } from "feed";
import { ArticleExports } from "../util/article";
import { mkdir, writeFile } from "fs/promises";
import Base from "../components/Base";

const SITE_URL = process.env.URL || "https://www.micahcantor.com";

function absolute(url: string | undefined): string | undefined {
	return url === undefined ? undefined : new URL(url, SITE_URL).toString();
}

export default async function FeedPage({ pages, currentPage }: PageProps) {
	const year = new Date().getFullYear();
	const author = {
		name: "Micah Cantor",
		email: "hello@micahcantor.com",
	};
	const feed = new Feed({
		title: "Micah Cantor",
		description: "Micah Cantor's personal site",
		id: absolute("/atom.xml"),
		link: SITE_URL,
		feedLinks: { atom: absolute("/atom.xml") },
		copyright: `Micah Cantor, ${year}`,
		language: "en",
		author,
	});
	pages
		.filter((page) => page.url.includes("/blog/"))
		.forEach((page) => {
			const metadata = ArticleExports.parse(page.exports).metadata;
			const url = absolute(page.url);
			feed.addItem({
				title: metadata.title,
				id: url,
				link: url as string,
				description: metadata.description,
				date: new Date(metadata.date),
				image: absolute(metadata.thumbnail),
				author: [author],
			});
		});
	await mkdir("dist", { recursive: true });
	await writeFile("dist/atom.xml", feed.atom1());
	
	return (
		<Base title="Feed" description="feed">
			Feed located at <a className="underline" href="/atom.xml">/atom.xml</a>.
		</Base>
	)
}
