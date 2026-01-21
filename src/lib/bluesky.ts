import { Agent, AppBskyFeedDefs, AppBskyFeedPost } from "@bluesky-social/api";

export type ATProtoURIComponents = {
	postId: string;
	identifier: string;
};

export function buildBlueskyURI({ postId, identifier }: ATProtoURIComponents) {
	return `at://${identifier}/app.bsky.feed.post/${postId}`;
}

const agent = new Agent({ service: "https://public.api.bsky.app" });

export async function getPostThread(
	uri: string,
): Promise<AppBskyFeedDefs.ThreadViewPost> {
	const response = await agent.getPostThread({ uri });
	if (!response.success) {
		throw new Error("Failed to get post thread");
	}
	if (!AppBskyFeedDefs.isThreadViewPost(response.data.thread)) {
		throw new Error("Post is not a thread");
	}
	const thread = response.data.thread as AppBskyFeedDefs.ThreadViewPost;
	return thread;
}

export async function getPostReplies(
	uri: string,
): Promise<AppBskyFeedDefs.ThreadViewPost[]> {
	const thread = await getPostThread(uri);
	const replies = (thread.replies ?? []).filter(
		AppBskyFeedDefs.isThreadViewPost,
	);
	return replies as AppBskyFeedDefs.ThreadViewPost[];
}

export function getPostRecord(record: unknown) {
	if (AppBskyFeedPost.isRecord(record)) {
		return (record as AppBskyFeedPost.Record);
	}
}

export function getPostText(record: unknown) {
	const postRecord = getPostRecord(record);
	return postRecord?.text ?? "";
}

export function getPostDate(record: unknown) {
	const postRecord = getPostRecord(record);
	if (postRecord) {
		return new Date(postRecord.createdAt);
	}
}
