import {Roboto_Flex} from 'next/font/google'
import {FC} from 'react'
import ReactMarkdown from 'react-markdown'

import styles from './articleText.module.sass'

const robotoFlex = Roboto_Flex({
	subsets: ['cyrillic', 'latin'],
	weight: '400'
})

const ArticleText: FC<Article> = ({text, slug}) => {
	const shareLink = `${getHost()}/blog/${slug}`

	return (
		<ReactMarkdown className={`${robotoFlex.className} ${styles.text}`}>
			{text}
		</ReactMarkdown>
	)
}

export default ArticleText
