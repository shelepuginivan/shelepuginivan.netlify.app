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
		typeof (article as Record<'title', unknown>).title === 'string' &&
		typeof (article as Record<'previewUrl', unknown>).previewUrl === 'string' &&
		typeof (article as Record<'slug', unknown>).slug === 'string' &&
		typeof (article as Record<'publicationTime', unknown>).publicationTime === 'number'
	)
}
