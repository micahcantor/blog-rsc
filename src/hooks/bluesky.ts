import { OAuthSession } from "@bluesky-social/oauth-client-browser";
import { useEffect, useState } from "react";

export function useBlueskyModule() {
	const [module, setModule] = useState<typeof import("../bluesky") | null>(
		null,
	);

	useEffect(() => {
		import("../bluesky").then(async (mod) => {
			await mod.initOAuth();
			setModule(mod);
		});
	}, []);

	return module;
}

export function useBlueskySession(): OAuthSession | null {
	const bluesky = useBlueskyModule();
	const [session, setSession] = useState<OAuthSession | null>(null);

	useEffect(() => {
		if (!bluesky) {
			return;
		}
		bluesky.restoreSession().then((session) => {
			if (session) {
				setSession(session);
			}
		});
	}, [bluesky]);

	return session;
}
