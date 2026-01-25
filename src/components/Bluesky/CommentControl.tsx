"use client";

import * as Popover from "@radix-ui/react-popover";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { type CommentSort } from "./CommentSection";
import { IconBox } from "../IconBox";
import * as Icon from "../Icon";

type CommentControlProps = {
	sort: CommentSort;
	onSortChange: (sort: CommentSort) => void;
};

export function CommentControl({ sort, onSortChange }: CommentControlProps) {
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button>
					<IconBox>
						<Icon.SlidersVertical className="size-6" />
					</IconBox>
				</button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md py-3 pl-3 pr-6 shadow-md"
					sideOffset={5}
					align="end"
				>
					<div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
						Sort by
					</div>
					<RadioGroup.Root
						value={sort}
						onValueChange={(value) => onSortChange(value as CommentSort)}
						className="flex flex-col gap-2"
					>
						<RadioItem value="top" label="Top" />
						<RadioItem value="latest" label="Latest" />
						<RadioItem value="oldest" label="Oldest" />
					</RadioGroup.Root>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}

function RadioItem({ value, label }: { value: string; label: string }) {
	return (
		<div className="flex items-center gap-2">
			<RadioGroup.Item
				value={value}
				id={value}
				className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 data-[state=checked]:border-slate-500 dark:data-[state=checked]:border-slate-400 bg-white dark:bg-slate-700"
			>
				<RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-slate-600 dark:after:bg-slate-300" />
			</RadioGroup.Item>
			<label
				htmlFor={value}
				className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer"
			>
				{label}
			</label>
		</div>
	);
}
