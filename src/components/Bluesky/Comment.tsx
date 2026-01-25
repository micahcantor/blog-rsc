import { AppBskyFeedDefs } from "@bluesky-social/api";
import * as Bluesky from "../../lib/bluesky";
import * as Icon from "../Icon";

export type CommentProps = {
	comment: AppBskyFeedDefs.ThreadViewPost;
	depth: number;
};

export function Comment({ comment, depth }: CommentProps) {
	const author = comment.post.author;
	const postId = comment.post.uri.split("/").pop();
	const postUrl = `https://bsky.app/profile/${author.handle}/post/${postId}`;
	const postDate = Bluesky.getPostDate(comment.post.record);
	const replies = (comment.replies ?? []).filter(
		AppBskyFeedDefs.isThreadViewPost,
	);
	const likeCount = comment.post.likeCount ?? 0;
	
	return (
		<div className="flex flex-col gap-2 min-w-0">
			<a
				href={postUrl}
				target="_blank"
				rel="noreferrer noopener"
				className="flex gap-3 rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-800 active:bg-slate-200 dark:active:bg-slate-800 transition-colors min-w-0"
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
					<div className="flex flex-col md:flex-row gap-x-2 items-baseline text-sm overflow-hidden">
						<span className="font-semibold truncate max-w-full">
							{author.displayName ?? author.handle}
						</span>
						<span className="text-slate-500 dark:text-slate-400 truncate max-w-full">
							@{author.handle}
						</span>
					</div>
					<p className="text-sm whitespace-pre-wrap break-words">{Bluesky.getPostText(comment.post.record)}</p>
					{postDate && (
						<div className="text-sm text-slate-500 dark:text-slate-400 flex flex-row flex-wrap items-center gap-x-1">
							<Icon.Heart className="size-5 pb-0.5" />
							<span>{likeCount}</span>
							<span>·</span>
							<span>{postDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span>
							<span>·</span>
							<span>{postDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
						</div>
					)}
				</div>
			</a>
			{depth >= 5 && (
				<a className="text-sm font-bold pl-3 text-slate-900 dark:text-sky-500" href={postUrl}>
					View more replies...
				</a>
			)}
			{replies.length > 0 && depth < 5 && (
				<div className="flex flex-col gap-2 pl-6 border-l-2 border-slate-300 dark:border-slate-700">
					{replies.map((reply) => (
						<Comment key={reply.post.uri} comment={reply} depth={depth + 1} />
					))}
				</div>
			)}
			
		</div>
	);
}
