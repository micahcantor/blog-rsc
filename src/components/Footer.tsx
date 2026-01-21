export function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="flex flex-row items-center justify-center pt-6 text-slate-600 dark:text-slate-300">
			<span className="text-sm">© Micah Cantor {year}</span>
		</footer>
	);
}
