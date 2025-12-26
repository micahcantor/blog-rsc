import React from "react";
import * as Icon from "../icons/Icon";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Profile } from "./ProfilePhoto/ProfilePhoto";

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

export function Header() {
	return (
		<header className="flex flex-row items-center justify-between">
			<div className="flex flex-row items-center gap-2">
				<Profile />
				<a href="/"><span className="font-extrabold text-3xl">Micah Cantor</span></a>
			</div>
			<div className="flex flex-row items-end space-x-2">
				<IconTray />
			</div>
		</header>
	)
}