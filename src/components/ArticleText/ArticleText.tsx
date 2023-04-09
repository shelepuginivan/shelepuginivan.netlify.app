import {Nunito, Roboto_Flex} from 'next/font/google'
import {FC} from 'react'
import ReactMarkdown from 'react-markdown'

import Container from '@/ui/Container/Container'
import {Article} from '@/utils/types/Article'

import styles from './articleText.module.sass'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const robotoFlex = Roboto_Flex({
	subsets: ['cyrillic', 'latin'],
	weight: '400'
})


const ArticleText: FC<Article> = ({
	title,
	text,
	publicationTime,
	previewUrl,
	slug}) => {
	const publicationTimeString = new Intl.DateTimeFormat('ru').format(publicationTime)
	const shareLink = `/blog/${slug}`

	return (
		<Container>
			<div className={styles.articleHeader}>
				<p>Опубликовано: {publicationTimeString}</p>
				<h1 className={nunito.className}>{title}</h1>
				<img src={previewUrl} alt=""/>
			</div>

			<ReactMarkdown className={`${robotoFlex.className} ${styles.text}`}>
				{text}
			</ReactMarkdown>
		</Container>
	)
}

export default ArticleText
