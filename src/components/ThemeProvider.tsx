"use client";

import {
	createContext,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from "react";

type ThemeValue = "light" | "dark";

interface Theme {
	theme: ThemeValue;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<Theme>({
	theme: "light",
	toggleTheme: () => {},
});

function getCurrentTheme(): ThemeValue {
	return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<ThemeValue>("light");

	useEffect(() => {
		setTheme(getCurrentTheme());
	}, []);

	const toggleTheme = useCallback(() => {
		const nextTheme: ThemeValue =
			getCurrentTheme() === "light" ? "dark" : "light";
		document.documentElement.dataset.theme = nextTheme;
		document.documentElement.style.colorScheme = nextTheme;
		try {
			localStorage.setItem("theme", nextTheme);
		} catch {}
		setTheme(nextTheme);
	}, []);

	return (
		<ThemeContext value={{ theme, toggleTheme }}>
			<body className="h-full w-full bg-slate-100 transition-colors motion-reduce:transition-none duration-600 dark:bg-slate-900 dark:text-slate-100">
				{children}
			</body>
		</ThemeContext>
	);
}
