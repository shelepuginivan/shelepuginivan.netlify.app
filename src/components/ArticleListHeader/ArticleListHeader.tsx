import {Nunito} from 'next/font/google'
import Link from 'next/link'
import {FC} from 'react'

import styles from './articleListHeader.module.sass'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const ArticleListHeader: FC = () => {
	return (
		<div className={`${nunito.className} ${styles.header}`}>
			<h1>Статьи</h1>
			<Link href='/feed.xml'><i className='icon-rss'></i> RSS</Link>
		</div>
	)
}

export default ArticleListHeader
