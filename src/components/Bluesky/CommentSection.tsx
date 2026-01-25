"use client";

import * as Bluesky from "../../lib/bluesky";
import { useQuery } from "@tanstack/react-query";
import { Comment } from "./Comment";
import { CommentCTA } from "./CommentCTA";
import { CommentControl } from "./CommentControl";
import { useState } from "react";
import { ThreadViewPost } from "@bluesky-social/api/dist/client/types/app/bsky/feed/defs";

type CommentSectionProps = {
	bskyPostId: string;
};

export type CommentSort = "top" | "oldest" | "latest"

function sortByLikes(p1: ThreadViewPost, p2: ThreadViewPost) {
	return (p2.post.likeCount ?? 0) - (p1.post.likeCount ?? 0);
}

function sortByDate(p1: ThreadViewPost, p2: ThreadViewPost) {
	return (Bluesky.getPostDate(p1.post.record) ?? new Date()).getTime() - (Bluesky.getPostDate(p2.post.record) ?? new Date()).getTime()
}

export function CommentSection({ bskyPostId }: CommentSectionProps) {
	const [commentSort, setCommentSort] = useState<CommentSort>("top");
	
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
			<p className="text-slate-700 dark:text-slate-300">
				No comments yet.
			</p>
		);
	}
	
	const sortedReplies = [...repliesQuery.data].sort((p1, p2) => {
		if (commentSort === "top") {
			return sortByLikes(p1, p2);
		} else if (commentSort === "latest") {
			return sortByDate(p2, p1);
		} else {
			return sortByDate(p1, p2);
		}
	});

	return (
		<>
			<div className="flex flex-row items-center justify-between pb-4">
				<h2 id="comments" className="text-xl font-semibold">Comments</h2>
				<CommentControl sort={commentSort} onSortChange={setCommentSort} />
			</div>
			<div className="flex flex-col gap-4">
				<CommentCTA bskyPostId={bskyPostId} />
				<div className="flex flex-col gap-4">
					{sortedReplies.map((reply) => (
						<Comment key={reply.post.uri} comment={reply} depth={0} />
					))}
				</div>
			</div>
		</>
	);
}
