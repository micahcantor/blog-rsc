import type { PageProps } from "@parcel/rsc";
import "../client";
import Base from "../components/Base";
import * as Icon from "../icons/Icon";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { ArticleNav } from "../components/ArticleNav";
import React from "react";

interface IconBoxProps {
	children: React.ReactNode
}

function IconBox({ children }: IconBoxProps) {
	return (
		<div className="flex justify-center items-center rounded-md p-1 hover:bg-slate-200 dark:hover:bg-slate-800">
			{children}
		</div>
	);
}

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
			<IconBox>
				<ThemeSwitcher className="size-6 hover:scale-110" />
			</IconBox>
			{icons.map((icon) => (
				<IconBox key={icon.url}>
					<a href={icon.url}>
						<icon.component className="size-6 hover:scale-110" />
					</a>
				</IconBox>
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
				<h1 className="font-bold text-xl pb-2">About me</h1>
				<p>Hi, I'm Micah. I'm a software engineer at <a href="https://fullcodemedical.com/">Full Code Medical</a> living in Boston. Here, you'll find my writing
					on my interests in web development, programming languages, and compilers. </p>
			</section>
			<section>
				<h1 className="font-bold text-xl pb-2">Writing</h1>
			</section>
			<ArticleNav pages={pages} />
		</Base>
	);
}
