"use client";

import * as Bluesky from "../../lib/bluesky";
import { useQuery } from "@tanstack/react-query";
import { Comment } from "./Comment";

type CommentSectionProps = {
	bskyPostId: string;
};

export function CommentSection({ bskyPostId }: CommentSectionProps) {
	const uri = Bluesky.buildBlueskyURI({
		postId: bskyPostId,
		identifier: "micahcantor.bsky.social",
	});
	const repliesQuery = useQuery({
		queryKey: ["replies"],
		queryFn: () => Bluesky.getPostReplies(uri),
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
				<Comment key={reply.post.uri} comment={reply} />
			))}
		</div>
	);
}
