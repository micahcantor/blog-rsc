import { ReactNode, StrictMode } from "react";
import "../lib/client";
import "../static/index.css";
import "../static/redaction.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import iconUrl from "url:../static/images/icon.ico";
import thumbnailUrl from "url:../static/images/thumbnail.png";

function themeScript() {
	const root = document.documentElement;
	const w = window as unknown as { __themeScriptRan?: boolean };

	function resolveTheme() {
		try {
			const stored = localStorage.getItem("theme");
			if (stored === "light" || stored === "dark") {
				return stored;
			}
			let prefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)",
			).matches;
			return prefersDark ? "dark" : "light";
		} catch {}
		return "light";
	}

	let ready = false;

	function applyTheme() {
		const theme = resolveTheme();
		if (root.getAttribute("data-theme") !== theme) {
			root.setAttribute("data-theme", theme);
		}
		if (root.style.colorScheme !== theme) {
			root.style.colorScheme = theme;
		}
		if (ready && !root.hasAttribute("data-theme-ready")) {
			root.setAttribute("data-theme-ready", "");
		}
	}

	applyTheme();

	if (w.__themeScriptRan) {
		return;
	};
	w.__themeScriptRan = true;

	try {
		new MutationObserver(applyTheme).observe(root, {
			attributeFilter: ["data-theme", "data-theme-ready", "style"],
		});
	} catch {}

	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			ready = true;
			applyTheme();
		});
	});
}

interface BaseProps {
	title: string;
	description: string;
	children: ReactNode;
}

export default function Base({ title, description, children }: BaseProps) {
	const base_url = process.env.URL as string;

	return (
		<StrictMode>
			<html className="h-full w-full" lang="en" suppressHydrationWarning>
				<head>
					<script dangerouslySetInnerHTML={{ __html: `(${themeScript})()` }} />
					<meta content="text/html; charset=utf-8" httpEquiv="content-type" />
					<meta content="width=device-width, initial-scale=1" name="viewport" />
					<meta property="og:title" content={title} />
					<meta property="og:type" content="blog" />
					<meta property="og:description" content={description} />
					<meta property="og:image" content={`${base_url}${thumbnailUrl}`} />
					<meta name="description" content={description} />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>

					<title>{title}</title>
					<link rel="icon" type="image/x-icon" sizes="32x32" href={iconUrl} />
				</head>
				<body className="h-full w-full bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
					<main className="min-h-screen max-w-2xl mx-4 md:mx-auto pb-8 font-[Redaction]">
						<Header />
						<div className="pb-2">{children}</div>
						<Footer />
					</main>
				</body>
			</html>
		</StrictMode>
	);
}
