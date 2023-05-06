export type Article = {
	title: string
	text: string
	previewUrl: string
	slug: string
	publicationTime: number
}

export const isArticleData = (article: unknown): article is Omit<Article, 'text'> => {
	return (
		typeof article === 'object' &&
		typeof (article as Record<Article, unknown>).title === 'string' &&
		typeof (article as Record<Article, unknown>).previewUrl === 'string' &&
		typeof (article as Record<Article, unknown>).slug === 'string' &&
		typeof (article as Record<Article, unknown>).publicationTime === 'number'
	)
}
