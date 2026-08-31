"use client";

import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import * as Icon from "./Icon";

type ThemeSwitcherProps = {
	className: string;
};

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
	const { toggleTheme } = useContext(ThemeContext);

	return (
		<button onClick={toggleTheme} aria-label="Toggle theme">
			<Icon.Sun className={`${className} dark:hidden`} />
			<Icon.Moon className={`${className} hidden dark:block`} />
		</button>
	);
}
