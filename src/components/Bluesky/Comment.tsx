import { AppBskyFeedDefs } from "@bluesky-social/api";
import * as Bluesky from "../../lib/bluesky";

export type CommentProps = {
	comment: AppBskyFeedDefs.ThreadViewPost;
};

export function Comment({ comment }: CommentProps) {
	const author = comment.post.author;
	const postId = comment.post.uri.split("/").pop();
	const postUrl = `https://bsky.app/profile/${author.handle}/post/${postId}`;
	const replies = (comment.replies ?? []).filter(
		AppBskyFeedDefs.isThreadViewPost,
	);

	return (
		<div className="flex flex-col gap-3">
			<a
				href={postUrl}
				target="_blank"
				rel="noreferrer noopener"
				className="flex gap-3 rounded-lg p-2 -m-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
			>
				{author.avatar ? (
					<img
						src={author.avatar}
						alt={`${author.handle} avatar`}
						className="w-10 h-10 rounded-full shrink-0"
					/>
				) : (
					<div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
				)}
				<div className="flex flex-col gap-1 min-w-0">
					<div className="flex flex-wrap items-baseline gap-x-2 text-sm">
						<span className="font-semibold truncate">
							{author.displayName ?? author.handle}
						</span>
						<span className="text-slate-500 dark:text-slate-400 truncate">
							@{author.handle}
						</span>
					</div>
					<p className="text-sm">{Bluesky.getPostText(comment.post.record)}</p>
				</div>
			</a>
			{replies.length > 0 && (
				<div className="flex flex-col gap-3 pl-6 border-l-2 border-slate-300 dark:border-slate-700">
					{replies.map((reply) => (
						<Comment key={reply.post.uri} comment={reply} />
					))}
				</div>
			)}
		</div>
	);
}
