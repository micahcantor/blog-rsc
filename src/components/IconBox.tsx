interface IconBoxProps {
	children: React.ReactNode
}

export function IconBox({ children }: IconBoxProps) {
	return (
		<div className="flex justify-center items-center rounded-md p-1 hover:bg-slate-200 dark:hover:bg-slate-700">
			{children}
		</div>
	);
}