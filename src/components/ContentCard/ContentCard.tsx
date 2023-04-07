import {Nunito} from '@next/font/google'
import Link from 'next/link'
import {FC} from 'react'

import styles from './contentCard.module.sass'

type PropsType = {
	title: string
	backgroundImage: Record<'src', string>
	href: string
}

const font = Nunito({
	subsets: ['latin'],
	weight: '400'
})

const ContentCard: FC<PropsType> = ({ title, backgroundImage, href }) => {
	return (
		<Link
			href={href}
			className={styles.cardWrapper}
			style={{backgroundImage: `url('${backgroundImage?.src}')`}}
		>
			<div className={styles.card}>
				<h1 className={font.className}>{title}</h1>
			</div>
		</Link>
	)
}

export default ContentCard
