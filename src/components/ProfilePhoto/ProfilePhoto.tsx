import profileUrl from "url:../../static/images/pfp.jpg";

export function Profile() {
	return (
		<img
			src={profileUrl}
			alt="Micah Cantor"
			width={256}
			height={256}
			className="border border-slate-300 dark:border-slate-800 rounded-full object-cover w-12 h-12 lg:w-14 lg:h-14"
		/>
	);
}
