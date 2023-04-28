import {Roboto_Flex} from 'next/font/google'
import {FC} from 'react'
import ReactMarkdown from 'react-markdown'

import ShareMenu from '@/components/ShareMenu/ShareMenu'
import Container from '@/ui/Container/Container'
import {getHost} from '@/utils/getHost'
import {Article} from '@/utils/types/Article'

import styles from './articleText.module.sass'

const robotoFlex = Roboto_Flex({
	subsets: ['cyrillic', 'latin'],
	weight: '400'
})

const ArticleText: FC<Article> = ({text, slug}) => {
	const shareLink = `${getHost()}/blog/${slug}`

	return (
		<Container>
			<ReactMarkdown className={`${robotoFlex.className} ${styles.text}`}>
				{text}
			</ReactMarkdown>
			<ShareMenu url={shareLink}/>
		</Container>
	)
}

export default ArticleText
