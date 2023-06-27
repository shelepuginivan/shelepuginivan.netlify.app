import { Feed } from 'feed'
import { GetServerSideProps } from 'next'

import { fetchRecentArticles } from '@/api/feed'
import { feedOptions } from '@/utils/constants'
import { getHost } from '@/utils/getHost'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const feed = new Feed(feedOptions)

	try {
		const articles = await fetchRecentArticles()

		articles.forEach(article => {
			feed.addItem({
				date: new Date(article.publicationTime),
				link: `${getHost()}/blog/${article.slug}`,
				title: article.title,
				image: article.previewUrl,
			})
		})
	} finally {
		res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
		res.write(feed.rss2())
		res.end()
	}

	return { props: {} }
}

export default () => null
