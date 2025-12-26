import type { PageProps } from "@parcel/rsc";
import "../client";
import Base from "../components/Base";
import { ArticleNav } from "../components/ArticleNav";

export default function Index({ pages, currentPage }: PageProps) {
	return (
		<Base
			title="Micah Cantor"
			description="Micah Cantor's personal website and blog"
		>
			<section className="pb-4">
				<h1 className="font-bold text-2xl pb-2">About me</h1>
				<p>Hi, I'm Micah. I'm a software engineer at <a href="https://fullcodemedical.com/">Full Code Medical</a> living in Boston. Here, you'll find my writing
					on my interests in web development, programming languages, and compilers. </p>
			</section>
			<section>
				<h1 className="font-bold text-2xl pb-2">Writing</h1>
				<ArticleNav pages={pages} />
			</section>
		</Base>
	);
}
