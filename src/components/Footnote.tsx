import { ReactNode } from "react";

interface CitationProps {
	value: string;
}

export function Citation({ value }: CitationProps) {
	return (
		<a href={`#note-${value}`}>
			<sup>{value}</sup>
		</a>
	)
}

interface FootnoteProps {
	value: string;
	children: ReactNode;
}

export function Footnote({ value, children }: FootnoteProps) {
	return (
		<div id={`note-${value}`} className="flex flex-col">
			<sup><strong>{value}</strong></sup>
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