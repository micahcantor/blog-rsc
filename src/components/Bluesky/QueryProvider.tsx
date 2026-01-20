"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const blueskyQueryClient = new QueryClient();

export function QueryProvider({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={blueskyQueryClient}>
			{children}
		</QueryClientProvider>
	);
}
