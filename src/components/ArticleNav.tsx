"use client";

import { Page } from "@parcel/rsc";
import { ArticleCard } from "./ArticleCard";
import { createContext, useCallback, useMemo, useState } from "react";
import { ArticleExports } from "../util/article";

export interface ArticleNavProps {
	pages: Page[],
}

export interface SelectedTag {
	selectedTags: Set<string>,
	addSelectedTag: (tag: string) => void,
	removeSelectedTag: (tag: string) => void,
}

export const SelectedTagContext = createContext<SelectedTag>({
	selectedTags: new Set(),
	addSelectedTag: (tag) => { },
	removeSelectedTag: (tag) => { },
});

export function ArticleNav({ pages }: ArticleNavProps) {
	const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
	const addSelectedTag = useCallback((tag: string) => {
		setSelectedTags((prevSelectedTags) => new Set(prevSelectedTags).add(tag));
	}, []);
	const removeSelectedTag = useCallback((tag: string) => {
		setSelectedTags((prevSelectedTags) => {
			const newSet = new Set(prevSelectedTags);
			newSet.delete(tag);
			return newSet;
		});
	}, []);
		
	const blogPages = useMemo(() => {
		return pages.filter((page) => {
			if (!page.url.includes("/blog/")) {
				return false;
			}
			const exports = ArticleExports.parse(page.exports);
			if (selectedTags.size > 0 && !exports.metadata.tags.some((tag) => selectedTags.has(tag))) {
				return false;
			}
			return true;
		});
	}, [pages, selectedTags]); 
	
	return (
		<SelectedTagContext value={{selectedTags, addSelectedTag, removeSelectedTag}}>
			<nav className="flex flex-col gap-4">
				{blogPages.map((page) => <ArticleCard key={page.url} page={page} />)}
			</nav>
		</SelectedTagContext>
	);
}