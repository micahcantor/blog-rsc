"use client";

import { useEffect } from "react";
import * as Icon from "./Icon";

type ThemeValue = "light" | "dark";

function setTheme(theme: ThemeValue, remember: boolean) {
	if (remember) {
		try {
			localStorage.setItem("theme", theme);
		} catch {}
	}
	const root = document.documentElement;
	root.setAttribute("data-theme", theme);
	root.style.colorScheme = theme;
}

function currentTheme(): ThemeValue {
	return document.documentElement.getAttribute("data-theme") === "dark"
		? "dark"
		: "light";
}

function hasExplicitChoice(): boolean {
	try {
		return localStorage.getItem("theme") !== null;
	} catch {
		return false;
	}
}

interface ThemeSwitcherProps {
	className: string;
}

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
	useEffect(() => {
		const prefersDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const onSystemChange = () => {
			if (!hasExplicitChoice()) {
				setTheme(prefersDarkQuery.matches ? "dark" : "light", false);
			}
		};
		prefersDarkQuery.addEventListener("change", onSystemChange);
		return () => prefersDarkQuery.removeEventListener("change", onSystemChange);
	}, []);

	const toggleTheme = () => {
		setTheme(currentTheme() === "dark" ? "light" : "dark", true);
	};

	return (
		<button onClick={toggleTheme} aria-label="Toggle theme">
			<Icon.Sun className={`${className} dark:hidden`} />
			<Icon.Moon className={`${className} hidden dark:block`} />
		</button>
	);
}
