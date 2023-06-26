import { Nunito } from 'next/font/google'
import { FC } from 'react'

import styles from './articleListHeader.module.sass'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const ArticleListHeader: FC = () => {
	return (
		<div className={`${nunito.className} ${styles.header}`}>
			<h1>Статьи</h1>
			<a href='/feed.xml'><i className='icon-rss'></i> RSS</a>
		</div>
	)
}

export default ArticleListHeader
