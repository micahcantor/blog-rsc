"use client";

import { ReactNode } from "react";
import * as Icon from "./Icon";

interface CitationProps {
	value: string;
}

export function Citation({ value }: CitationProps) {
	function onClick() {
		const note = document.getElementById(`note-${value}`);
		note?.scrollIntoView({ behavior: "smooth", block: "nearest" });
	}
	
	return (
		<button className="cursor-pointer" id={`citation-${value}`} onClick={onClick}>
			<sup className="font-bold underline">{value}</sup>
		</button>
	)
}

interface FootnoteProps {
	value: string;
	children: ReactNode;
}

export function Footnote({ value, children }: FootnoteProps) {
	function onClickBack() {
		const citation = document.getElementById(`citation-${value}`);
		citation?.scrollIntoView({ behavior: "smooth", block: "nearest" });
	}
	
	return (
		<div id={`note-${value}`} className="flex flex-col">
			<div className="flex flex-row items-center justify-between">
				<span className="font-semibold pt-0.5">{value}</span>
				<button className="cursor-pointer" onClick={onClickBack}>
					<Icon.Back className="size-5 font-bold" />
				</button>
			</div>
			<div>
				{children}
			</div>
		</div>
	)
}

interface FootnotesProps {
	children: ReactNode;
}

export function Footnotes({ children }: FootnotesProps) {
	return (
		<>
			<h3 className="pb-4">Notes</h3>
			<div className="flex flex-col gap-2">
				{children}
			</div>
		</>
	)
}