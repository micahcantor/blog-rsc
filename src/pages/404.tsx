import type { PageProps } from "@parcel/rsc";
import Base from "../components/Base";

export default function NotFound({ pages, currentPage }: PageProps) {
	return (
		<Base title="Not Found" description="Page not found">
			<main className="prose dark:prose-invert">
				<h1>Error 404: Not Found</h1>
				<p>That page doesn't exist. If you think it should, please <a href="mailto:hello@micahcantor.com">let me know!</a></p>
			</main>
		</Base>
	)
}