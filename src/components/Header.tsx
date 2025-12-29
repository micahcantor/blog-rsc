import React from "react";
import * as Icon from "./Icon";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Profile } from "./ProfilePhoto/ProfilePhoto";
import { RSCNavigation } from "../util/rscNavigation";
import { IconBox } from "./IconBox";

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
				<ThemeSwitcher className="size-6" />
			</IconBox>
			{icons.map((icon) => (
				<IconBox key={icon.url}>
					<a data-rsc-navigation={RSCNavigation.Disabled} href={icon.url}>
						<icon.component className="size-6" />
					</a>
				</IconBox>
			))}
		</>
	);
}

export function Header() {
	return (
		<header id="header" className="flex flex-row items-center justify-between py-4">
			<div className="flex flex-row items-center gap-2">
				<Profile />
				<a href="/"><span className="font-bold text-3xl">Micah Cantor</span></a>
			</div>
			<div className="flex flex-row items-end space-x-1 lg:space-x-2">
				<IconTray />
			</div>
		</header>
	)
}