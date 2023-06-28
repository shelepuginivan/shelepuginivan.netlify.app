import { Nunito } from 'next/font/google'
import { FC } from 'react'

import { Article } from '@/utils/types/Article'

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
	title }) => {
	const publicationDate = new Date(publicationTime)
	const textDownloadLink = `/api/blog/${slug}/download`

	return (
		<section className={styles.articleHeader}>
			<div className={styles.info}>
				<p>
					Опубликовано:
					<time dateTime={publicationDate.toISOString()}>
						{publicationDate.toLocaleDateString('ru')}
					</time>
				</p>
				<a href={textDownloadLink}>Скачать текст</a>
			</div>
			<h1 className={nunito.className}>{title}</h1>
			<img src={previewUrl} alt='Article preview'/>
		</section>
	)
}

export default ArticleHeader
