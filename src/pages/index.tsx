import type { PageProps } from "@parcel/rsc";
import "../client";
import Base from "../components/Base";
import * as Icon from "../icons/Icon";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { ArticleNav } from "../components/ArticleNav";

function IconTray() {
	const icons = [
		{
			component: Icon.Mail,
			url: "mailto:hello@micahcantor.com",
		},
		{
			component: Icon.Rss,
			url: "/atom.xml",
		},
	];
	return (
		<>
			<ThemeSwitcher className="size-6 hover:scale-110" />
			{icons.map((icon) => (
				<a href={icon.url} key={icon.url}>
					<icon.component className="size-6 hover:scale-110" />
				</a>
			))}
		</>
	);
}

export default function Index({ pages, currentPage }: PageProps) {
	return (
		<Base
			title="Micah Cantor"
			description="Micah Cantor's personal website and blog"
		>
			<header className="flex flex-row justify-between">
				<a href="/"><span className="font-extrabold text-2xl">Micah Cantor</span></a>
				<div className="flex flex-row items-end space-x-2">
					<IconTray />
				</div>
			</header>
			<section className="my-4">
				<h1 className="font-bold text-xl">About me</h1>
				<p>Hi, I'm Micah. I'm a software engineer at <a href="https://fullcodemedical.com/">Full Code Medical</a> living in Boston. Here, you'll find my writing
					on my interests in web development, programming languages, and compilers. </p>
			</section>
			<section>
				<h1 className="font-bold text-xl">Writing</h1>
			</section>
			<ArticleNav pages={pages} />
		</Base>
	);
}
