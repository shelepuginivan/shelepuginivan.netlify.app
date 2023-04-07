import {Nunito} from '@next/font/google'
import {FC} from 'react'

import bottomCurve from '@/assets/bottom-curve.svg'

import styles from './footer.module.sass'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const Footer: FC = () => {
	const backgroundImage = `url('${bottomCurve.src}')`

	return (
		<footer className={styles.footer}>
			<div className={styles.curve} style={{backgroundImage}}></div>
			<div className={`${styles.content} ${nunito.className}`}>
				&copy; Шелепугин Иван, 2022&ndash;{new Date().getFullYear()}
			</div>
		</footer>
	)
}

export default Footer
