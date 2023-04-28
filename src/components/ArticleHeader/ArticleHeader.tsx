import {Nunito} from 'next/font/google'
import {FC} from 'react'

import {Article} from '@/utils/types/Article'

import styles from './articleHeader.module.sass'

type PropsType = Omit<Article, 'text'>

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const ArticleHeader: FC<PropsType> = ({
	previewUrl,
	publicationTime,
	slug,
	title}) => {
	const publicationTimeString = new Intl.DateTimeFormat('ru').format(publicationTime)
	const pdfLink = `/api/blog/${slug}/download`

	return (
		<section className={styles.articleHeader}>
			<div className={styles.info}>
				<p>Опубликовано: {publicationTimeString}</p>
				<a target='_blank' href={pdfLink}>Скачать текст</a>
			</div>
			<h1 className={nunito.className}>{title}</h1>
			<img src={previewUrl} alt=''/>
		</section>
	)
}

export default ArticleHeader
