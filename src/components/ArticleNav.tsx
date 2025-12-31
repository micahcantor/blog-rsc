"use client";

import { Page } from "@parcel/rsc";
import { ArticleCard } from "./ArticleCard";
import { createContext, useCallback, useMemo, useState } from "react";
import { ArticleExports } from "../util/article";
import * as Icon from "./Icon";
import { IconBox } from "./IconBox";

export interface ArticleNavProps {
	pages: Page[];
}

export interface SelectedTag {
	selectedTags: Set<string>;
	addSelectedTag: (tag: string) => void;
	removeSelectedTag: (tag: string) => void;
}

export const SelectedTagContext = createContext<SelectedTag>({
	selectedTags: new Set(),
	addSelectedTag: (tag) => {},
	removeSelectedTag: (tag) => {},
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
		const filteredPages = pages.filter((page) => {
			if (!page.url.includes("/blog/")) {
				return false;
			}
			const exports = ArticleExports.parse(page.exports);
			if (
				selectedTags.size > 0 &&
				!exports.metadata.tags.some((tag) => selectedTags.has(tag))
			) {
				return false;
			}
			return true;
		});
		// Sort pages in descending order (most recent first)
		filteredPages.sort((a, b) => {
			const aDate = ArticleExports.parse(a.exports).metadata.date;
			const bDate = ArticleExports.parse(b.exports).metadata.date;
			return new Date(aDate) <= new Date(bDate) ? 1 : -1;
		});
		return filteredPages;
	}, [pages, selectedTags]);
	
	const navKey = useMemo(() => Array.from(selectedTags).sort().join(","), [selectedTags]);
	
	return (
		<SelectedTagContext
			value={{ selectedTags, addSelectedTag, removeSelectedTag }}
		>
			<div className="flex flex-row items-center justify-between pb-2">
				<h1 className="font-bold text-2xl">Writing</h1>
				{ selectedTags.size > 0 && (
					<IconBox>
						<button onClick={() => setSelectedTags(new Set())} aria-label="Filter">
							<Icon.Funnel className="size-6"/>
						</button>
					</IconBox>
				)}
			</div>
			<nav key={navKey} className="flex flex-col gap-4 animate-slide-up motion-reduce:animate-none">
				{blogPages.map((page) => (
					<ArticleCard key={page.url} page={page} />
				))}
			</nav>
		</SelectedTagContext>
	);
}
