import {Feed} from 'feed'
import {GetServerSideProps} from 'next'

import {feedOptions} from '@/utils/constants'
import {getHost} from '@/utils/getHost'
import {Article, isArticleData} from '@/utils/types/Article'

const feed = new Feed(feedOptions)

export const getServerSideProps: GetServerSideProps = async ({res}) => {
	const articlesRes = await fetch(`${getHost()}/api/blog`)
	const articlesJson = await articlesRes.json() as unknown

	const articles = (
		Array.isArray(articlesJson) &&
		articlesJson.length > 0 &&
		articlesJson.every(article => isArticleData(article))
	)
		? articlesJson as Article[]
		: []

	articles.forEach(article => {
		feed.addItem({
			date: new Date(article.publicationTime),
			link: `${getHost()}/blog/${article.slug}`,
			title: article.title,
			image: article.previewUrl,
		})
	})

	res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
	res.write(feed.rss2())
	res.end()

	return {props: {}}
}

export default () => null
