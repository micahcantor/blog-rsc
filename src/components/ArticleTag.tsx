export interface ArticleTag {
	value: string,
}

export function ArticleTag({ value }: ArticleTag) {
	return (
		<span className="bg-blue-500 rounded-md hover:scale-110">{value}</span>
	)
}