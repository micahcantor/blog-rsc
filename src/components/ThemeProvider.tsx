"use client";

import {
	createContext,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
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

export default function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<ThemeValue>("light");
	const toggleTheme = useCallback(() => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	}, [setTheme]);

	useEffect(() => {
		if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	}, []);

	return (
		<ThemeContext value={{ theme, toggleTheme }}>
			<body
				className="h-full w-full bg-slate-100 transition-colors motion-reduce:transition-none duration-600 dark:bg-slate-900 dark:text-slate-100"
				data-theme={theme}
			>
				{children}
			</body>
		</ThemeContext>
	);
}
