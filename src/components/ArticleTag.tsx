"use client";

import { useCallback, useContext, useMemo } from "react";
import { SelectedTagContext } from "./ArticleNav";
import clsx from "clsx";

export interface ArticleTag {
	value: string;
}

export function ArticleTag({ value }: ArticleTag) {
	const { selectedTags, addSelectedTag, removeSelectedTag } = useContext(SelectedTagContext);
	const isSelected = useMemo(
		() => selectedTags.has(value),
		[value, selectedTags],
	);
	const onTagClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		if (isSelected) {
			removeSelectedTag(value);
		} else {
			addSelectedTag(value);
		}
	}, [isSelected, removeSelectedTag, addSelectedTag, value]);
		
	return (
		<button
			onClick={onTagClick}
			className={clsx(
				"italic bg-violet-300 dark:bg-violet-700 py-0.5 px-1.5 text-sm rounded-3xl hover:scale-110",
				isSelected && "border border-slate-800 dark:border-slate-300",
			)}
		>
			{`#${value}`}
		</button>
	);
}
