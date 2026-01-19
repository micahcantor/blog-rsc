"use client";

import * as BlueskyAPI from "../lib/bluesky/api";
import { useQuery } from "@tanstack/react-query";
import { ThreadViewPost } from "@bluesky-social/api/dist/client/types/app/bsky/feed/defs";
import { useContext } from "react";
import { BlueskyClientContext } from "./BlueskyClientProvider";

type BlueskyCommentsProps = {
	bskyPostId: string;
};

type BlueskyCommentProps = {
	comment: ThreadViewPost;
};

function BlueskyComment({ comment }: BlueskyCommentProps) {
	return (
		<div className="flex">
			<p>{comment.post.author.handle}</p>
		</div>
	);
}

export function BlueskyComments({ bskyPostId }: BlueskyCommentsProps) {
	const { agent } = useContext(BlueskyClientContext);
	const uri = BlueskyAPI.buildBlueskyURI({
		postId: bskyPostId,
		identifier: "micahcantor.bsky.social",
	});
	const repliesQuery = useQuery({
		queryKey: ["replies"],
		queryFn: () => BlueskyAPI.getPostReplies(agent!, uri),
	});

	console.log("REPLIES", repliesQuery.data);

	return (
		<div className="flex justify-center gap-4">
			{repliesQuery.data?.map((reply) => {
				return (
					<BlueskyComment key={reply.post.uri} comment={reply}></BlueskyComment>
				);
			})}
		</div>
	);
}
