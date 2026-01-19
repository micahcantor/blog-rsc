"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, ReactNode } from "react";
import { useBlueskyAgent, useBlueskyModule } from "../hooks/bluesky";
import { Agent } from "@bluesky-social/api";

const queryClient = new QueryClient();

type BlueskyClientProviderProps = {
	children: ReactNode;
};

type BlueskyClientContext = {
	agent: Agent | null;
	bluesky: typeof import("../lib/bluesky/client") | null;
};

export const BlueskyClientContext = createContext<BlueskyClientContext>({
	agent: null,
	bluesky: null,
});

export function BlueskyClientProvider({
	children,
}: BlueskyClientProviderProps) {
	const bluesky = useBlueskyModule();
	const agent = useBlueskyAgent();

	if (!(bluesky && agent)) {
		return;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<BlueskyClientContext value={{ bluesky, agent }}>
				{children}
			</BlueskyClientContext>
		</QueryClientProvider>
	);
}
