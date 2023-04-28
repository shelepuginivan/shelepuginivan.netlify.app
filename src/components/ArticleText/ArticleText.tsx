import {Nunito, Roboto_Flex} from 'next/font/google'
import {FC} from 'react'
import ReactMarkdown from 'react-markdown'

import ShareMenu from '@/components/ShareMenu/ShareMenu'
import Container from '@/ui/Container/Container'
import {getHost} from '@/utils/getHost'
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
	const shareLink = `${getHost()}/blog/${slug}`
	const pdfLink = `/api/blog/${slug}/download`

	return (
		<Container>
			<div className={styles.articleHeader}>
				<p>Опубликовано: {publicationTimeString}</p>
				<a target='_blank' href={pdfLink}>Читать в PDF</a>
				<h1 className={nunito.className}>{title}</h1>
				<img src={previewUrl} alt=""/>
			</div>

			<ReactMarkdown className={`${robotoFlex.className} ${styles.text}`}>
				{text}
			</ReactMarkdown>
			<ShareMenu url={shareLink}/>
		</Container>
	)
}

export default ArticleText
