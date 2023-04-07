import {Nunito} from '@next/font/google'
import Link from 'next/link'
import {FC} from 'react'

import styles from './contentCard.module.sass'

type PropsType = {
	title: string
	backgroundImage: Record<'src', string> | string
	href: string
}

const nunito = Nunito({
	subsets: ['latin'],
	weight: '400'
})

const ContentCard: FC<PropsType> = (props) => {
	const backgroundImage = `url('${
		typeof props.backgroundImage === 'string'
			? props.backgroundImage
			: props.backgroundImage.src}')`

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
