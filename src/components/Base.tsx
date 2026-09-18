import { ReactNode, StrictMode } from "react";
import "../lib/client";
import "../static/index.css";
import "../static/redaction.css";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface BaseProps {
	title: string;
	description: string;
	children: ReactNode;
}

export default function Base({ title, description, children }: BaseProps) {
	const base_url = process.env.URL as string;

	return (
		<StrictMode>
			<html
				className="h-full w-full"
				lang="en"
				data-theme="dark"
				style={{ colorScheme: "dark" }}
			>
				<head>
					<meta content="text/html; charset=utf-8" httpEquiv="content-type" />
					<meta content="width=device-width, initial-scale=1" name="viewport" />
					<meta property="og:title" content={title} />
					<meta property="og:type" content="blog" />
					<meta property="og:description" content={description} />
					<meta
						property="og:image"
						content={`${base_url}/images/thumbnail.png`}
					/>
					<meta name="description" content={description} />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>

					<title>{title}</title>
					<link rel="icon" type="image/png" href={"/images/icon.ico"} />
				</head>
				<body className="h-full w-full bg-slate-900 text-slate-100">
					<main className="min-h-screen max-w-2xl mx-4 md:mx-auto pb-8 font-[Redaction]">
						<Header />
						<div className="pb-2">
							{children}
						</div>
						<Footer />
					</main>
				</body>
			</html>
		</StrictMode>
	);
}
