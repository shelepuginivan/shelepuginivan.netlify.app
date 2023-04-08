import {Nunito} from 'next/font/google'
import Link from 'next/link'
import {FC} from 'react'

import {imgToCssUrl} from '@/utils/imgToCssUrl'

import styles from './contentCard.module.sass'

type PropsType = {
	title: string
	backgroundImage: string | Record<'src', string>
	href: string
}

const nunito = Nunito({
	subsets: ['latin'],
	weight: '400'
})

const ContentCard: FC<PropsType> = (props) => {
	const backgroundImage = imgToCssUrl(props.backgroundImage)

	return (
		<Link
			href={props.href}
			className={styles.cardWrapper}
			style={{backgroundImage}}
		>
			<div className={styles.card}>
				<h1 className={nunito.className}>{props.title}</h1>
			</div>
		</Link>
	)
}

export default ContentCard
