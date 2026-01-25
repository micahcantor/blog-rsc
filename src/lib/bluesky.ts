import { Agent, AppBskyFeedDefs, AppBskyFeedPost } from "@bluesky-social/api";
import { ThreadgateView } from "@bluesky-social/api/dist/client/types/app/bsky/feed/defs";

export type ATProtoURIComponents = {
	postId: string;
	identifier: string;
};

export function buildBlueskyURI({ postId, identifier }: ATProtoURIComponents) {
	return `at://${identifier}/app.bsky.feed.post/${postId}`;
}

const agent = new Agent({ service: "https://public.api.bsky.app" });

type PostData = {
	thread: AppBskyFeedDefs.ThreadViewPost;
	threadgate: ThreadgateView | undefined;
};

export async function getPostData(uri: string): Promise<PostData> {
	const response = await agent.getPostThread({ uri });
	if (!response.success) {
		throw new Error("Failed to get post thread");
	}
	if (!AppBskyFeedDefs.isThreadViewPost(response.data.thread)) {
		throw new Error("Post is not a thread");
	}
	return response.data as PostData;
}

export async function getPostReplies(
	uri: string,
): Promise<AppBskyFeedDefs.ThreadViewPost[]> {
	const { thread, threadgate } = await getPostData(uri);
	const hiddenReplies = new Set(
		(threadgate?.record?.hiddenReplies as string[]) ?? [],
	);
	const replies = (thread.replies ?? []).filter((reply) => {
		return AppBskyFeedDefs.isThreadViewPost(reply) && !hiddenReplies.has(reply.post.uri);
	}) as AppBskyFeedDefs.ThreadViewPost[];
	return replies;
}

export function getPostRecord(record: unknown) {
	if (AppBskyFeedPost.isRecord(record)) {
		return record as AppBskyFeedPost.Record;
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
