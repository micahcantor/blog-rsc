"use client";

import * as BlueskyAPI from "../lib/bluesky/api";
import { AppBskyFeedDefs } from "@bluesky-social/api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { BlueskyClientContext } from "./BlueskyClientProvider";

type BlueskyCommentSectionProps = {
	bskyPostId: string;
};

type BlueskyCommentProps = {
	comment: AppBskyFeedDefs.ThreadViewPost;
};

function BlueskyComment({ comment }: BlueskyCommentProps) {
	const author = comment.post.author;
	const replies = (comment.replies ?? []).filter(
		AppBskyFeedDefs.isThreadViewPost,
	);

	return (
		<div className="flex flex-col gap-3">
			<div className="flex gap-3">
				<a
					href={`https://bsky.app/profile/${author.did}`}
					target="_blank"
					rel="noreferrer noopener"
					className="shrink-0"
				>
					{author.avatar ? (
						<img
							src={author.avatar}
							alt={`${author.handle} avatar`}
							className="w-10 h-10 rounded-full"
						/>
					) : (
						<div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600" />
					)}
				</a>
				<div className="flex flex-col gap-1 min-w-0">
					<a
						href={`https://bsky.app/profile/${author.did}`}
						target="_blank"
						rel="noreferrer noopener"
						className="flex flex-wrap items-baseline gap-x-2 text-sm"
					>
						<span className="font-semibold truncate">
							{author.displayName ?? author.handle}
						</span>
						<span className="text-slate-500 dark:text-slate-400 truncate">
							@{author.handle}
						</span>
					</a>
					<p className="text-sm">
						{BlueskyAPI.getPostText(comment.post.record)}
					</p>
				</div>
			</div>
			{replies.length > 0 && (
				<div className="flex flex-col gap-3 pl-6 border-l-2 border-slate-300 dark:border-slate-700">
					{replies.map((reply) => (
						<BlueskyComment key={reply.post.uri} comment={reply} />
					))}
				</div>
			)}
		</div>
	);
}

export function BlueskyCommentSection({
	bskyPostId,
}: BlueskyCommentSectionProps) {
	const { agent } = useContext(BlueskyClientContext);
	const uri = BlueskyAPI.buildBlueskyURI({
		postId: bskyPostId,
		identifier: "micahcantor.bsky.social",
	});
	const repliesQuery = useQuery({
		queryKey: ["replies"],
		queryFn: () => BlueskyAPI.getPostReplies(agent!, uri),
	});

	if (repliesQuery.isLoading) {
		return (
			<div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
				<div className="w-4 h-4 border-2 border-slate-300 dark:border-slate-600 border-t-slate-500 dark:border-t-slate-400 rounded-full animate-spin" />
				<span>Loading comments...</span>
			</div>
		);
	}

	if (repliesQuery.error) {
		return (
			<p className="text-sm text-red-500">
				Error: {repliesQuery.error.message}
			</p>
		);
	}

	if (!repliesQuery.data || repliesQuery.data.length === 0) {
		return (
			<p className="text-sm text-slate-500 dark:text-slate-400">
				No comments yet.
			</p>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			{repliesQuery.data.map((reply) => (
				<BlueskyComment key={reply.post.uri} comment={reply} />
			))}
		</div>
	);
}
