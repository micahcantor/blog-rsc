import { Agent } from "@bluesky-social/api";
import {
	isThreadViewPost,
	type ThreadViewPost,
} from "@bluesky-social/api/dist/client/types/app/bsky/feed/defs";

export type ATProtoURIComponents = {
	postId: string;
	identifier: string;
};

export function buildBlueskyURI({ postId, identifier }: ATProtoURIComponents) {
	return `at://${identifier}/app.bsky.feed.post/${postId}`;
}

export async function getPostThread(
	agent: Agent,
	uri: string,
): Promise<ThreadViewPost> {
	const response = await agent.getPostThread({ uri });
	if (!response.success) {
		throw new Error("Failed to get post thread");
	}
	if (!isThreadViewPost(response.data)) {
		throw new Error("Failed to get post thread");
	}
	const thread = response.data.thread as ThreadViewPost;
	return thread;
}

export async function getPostReplies(
	agent: Agent,
	uri: string,
): Promise<ThreadViewPost[]> {
	const thread = await getPostThread(agent, uri);
	const replies = (thread.replies ?? []).filter(isThreadViewPost);
	return replies as ThreadViewPost[];
}
