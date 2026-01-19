import type { PageProps } from "@parcel/rsc";
import Base from "../components/Base";
import { ArticleNav } from "../components/ArticleNav";

export default function Index({ pages, currentPage }: PageProps) {
	return (
		<Base
			title="Micah Cantor"
			description="Micah Cantor's personal website and blog"
		>
			<div className="pb-4">
				<h1 className="font-bold text-2xl pb-2">About me</h1>
				<p>
					Hi, I'm Micah. I'm a software engineer at{" "}
					<a className="underline" href="https://fullcodemedical.com">
						Full Code Medical
					</a>{" "}
					living in Boston, MA. This is my corner of the internet, where I write
					about my interests in web development, compilers and programming
					languages.{" "}
				</p>
			</div>
			<ArticleNav pages={pages} />
		</Base>
	);
}
