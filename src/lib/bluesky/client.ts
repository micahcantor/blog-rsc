import {
	BrowserOAuthClient,
	oauthClientMetadataSchema,
	type OAuthSession,
} from "@bluesky-social/oauth-client-browser";
import { getClientMetadata } from "../oauth-client-metadata";

let oauthClient: BrowserOAuthClient | null = null;

const didStorageKey = "bsky:did";

export function getOAuthClient(): BrowserOAuthClient {
	if (!oauthClient) {
		oauthClient = new BrowserOAuthClient({
			handleResolver:
				"https://bsky.social/xrpc/com.atproto.identity.resolveHandle",
			clientMetadata: oauthClientMetadataSchema.parse(getClientMetadata()),
		});
	}
	return oauthClient;
}

export async function initOAuth(): Promise<string | undefined> {
	const client = getOAuthClient();
	const result = await client.initRestore();
	if (result) {
		const { session } = result;
		localStorage.setItem(didStorageKey, session.did);
		return session.did;
	}
}

export async function restoreSession(): Promise<OAuthSession | undefined> {
	const did = localStorage.getItem(didStorageKey);
	if (!did) {
		return;
	}
	const client = getOAuthClient();
	return client.restore(did);
}

export async function signIn(handle: string): Promise<void> {
	const client = getOAuthClient();
	await client.signIn(handle, {
		state: window.location.href,
	});
}

export async function callback(): Promise<void> {
	if (!location.hash.includes("state")) {
		return;
	}
	const client = getOAuthClient();
	const params = new URLSearchParams(location.hash.slice(1));
	const { session, state } = await client.callback(params);
	localStorage.setItem(didStorageKey, session.did);
	if (state) {
		history.replaceState(null, "", state);
	}
}
