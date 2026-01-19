"use client";

import { useContext, useState } from "react";
import { BlueskyClientContext } from "./BlueskyClientProvider";

export default function BlueskyAuth() {
	const { bluesky, agent } = useContext(BlueskyClientContext);
	const [handle, setHandle] = useState("");
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!handle.trim()) {
			setError("Please enter your Bluesky handle");
			return;
		}
		setError(null);
		setIsSigningIn(true);
		try {
			await bluesky!.signIn(handle.trim());
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to sign in");
			setIsSigningIn(false);
		}
	};

	return (
		<div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
			<form onSubmit={handleSignIn} className="flex flex-col gap-3">
				<label className="text-sm text-gray-600 dark:text-gray-300">
					Sign in with Bluesky to comment
				</label>
				<div className="flex gap-2">
					<input
						type="text"
						value={handle}
						onChange={(e) => setHandle(e.target.value)}
						placeholder="your-handle.bsky.social"
						className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={isSigningIn}
					/>
					<button
						type="submit"
						disabled={isSigningIn}
						className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{isSigningIn ? "Signing in..." : "Sign in"}
					</button>
				</div>
				{error && <p className="text-sm text-red-500">{error}</p>}
			</form>
		</div>
	);
}
