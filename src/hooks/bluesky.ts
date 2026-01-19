import { Agent } from "@bluesky-social/api";
import { useEffect, useState } from "react";

export function useBlueskyModule() {
	const [module, setModule] = useState<
		typeof import("../lib/bluesky/client") | null
	>(null);

	useEffect(() => {
		import("../lib/bluesky/client").then(async (mod) => {
			await mod.initOAuth();
			setModule(mod);
		});
	}, []);

	return module;
}

export function useBlueskyAgent(): Agent | null {
	const bluesky = useBlueskyModule();
	const [agent, setAgent] = useState<Agent | null>(null);

	useEffect(() => {
		if (!bluesky) {
			return;
		}
		bluesky.restoreSession().then((session) => {
			if (session) {
				setAgent(new Agent(session));
			} else {
				setAgent(new Agent({ service: "https://public.api.bsky.app" }));
			}
		});
	}, [bluesky]);

	return agent;
}
