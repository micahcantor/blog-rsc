"use client";

import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import * as Icon from "../icons/Icon";

type ThemeSwitcherProps = {
	className: string;
};

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<button onClick={toggleTheme}>
			{theme === "light" ? (
				<Icon.Sun className={className} />
			) : (
				<Icon.Moon className={className} />
			)}
		</button>
	);
}
