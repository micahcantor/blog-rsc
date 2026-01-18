import {
	BrowserOAuthClient,
	oauthClientMetadataSchema,
	type OAuthSession,
} from "@bluesky-social/oauth-client-browser";
import { getClientMetadata } from "./oauth-client-metadata";

let oauthClient: BrowserOAuthClient | null = null;

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

export async function initOAuth(): Promise<URL | string | undefined> {
	const client = getOAuthClient();
	const result = await client.init();
	console.log({ client, result });
	if (result) {
		const { session, state } = result;
		localStorage.setItem("bsky:did", session.did);
		if (state != null) {
			return new URL(state);
		} else {
			return session.sub;
		}
	}
}

export async function restoreSession(): Promise<OAuthSession | undefined> {
	const did = localStorage.getItem("bsky:did");
	console.log("restoring", did);
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
	if (!location.search.includes("state")) {
		return;
	}
	const client = getOAuthClient();
	await client.callback(new URLSearchParams(location.search));
}

// Example callback URL
// https://micahs-macbook-pro.tailf74645.ts.net/callback
// #state=-6Cs_ctnGXRIFxGrMyqP3Q
// &iss=https%3A%2F%2Fbsky.social
// &code=cod-9b5578ae981cefe2d95db25a6f83c031fc3bb6ff84240b6c6a2d4850cc7a9c6e
