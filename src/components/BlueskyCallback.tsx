"use client";

import { useEffect } from "react";
import { useBlueskyModule } from "../hooks/bluesky";

export function BlueskyCallback() {
	const bluesky = useBlueskyModule();

	useEffect(() => {
		if (bluesky) {
			bluesky.callback();
		}
	}, [bluesky]);

	return (
		<>
			<span>Redirecting..</span>
		</>
	);
}
