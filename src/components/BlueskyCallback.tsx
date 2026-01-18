"use client";

import { useEffect } from "react";
import { useBlueskyModule } from "../hooks/bluesky";

export function BlueskyCallback() {
	const bluesky = useBlueskyModule();

	useEffect(() => {
		console.log("Here!", bluesky);

		if (!bluesky) {
			return;
		}
		bluesky.callback();
	}, [bluesky]);

	return <span>Redirecting...</span>;
}
