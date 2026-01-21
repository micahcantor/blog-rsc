import * as Icon from "../Icon";

type CommentCTAProps = {
	bskyPostId: string;
	identifier?: string;
};

export function CommentCTA({
	bskyPostId,
	identifier = "micahcantor.bsky.social",
}: CommentCTAProps) {
	const postUrl = `https://bsky.app/profile/${identifier}/post/${bskyPostId}`;

	return (
		<a
			href={postUrl}
			target="_blank"
			rel="noreferrer noopener"
			className="block p-4 rounded-lg bg-sky-100 dark:bg-sky-950 hover:bg-sky-200 dark:hover:bg-sky-900 active:bg-sky-200 dark:active:bg-sky-900 transition-colors"
		>
			<div className="flex items-center gap-3">
				<div className="w-8 h-8 rounded shrink-0">
					<Icon.Bluesky />
				</div>
				<span className="text-slate-700 dark:text-slate-300">
					Join the conversation by replying on Bluesky...
				</span>
				<div className="w-5 w-5 shrink-0">
					<Icon.RightArrow />
				</div>
			</div>
		</a>
	);
}
