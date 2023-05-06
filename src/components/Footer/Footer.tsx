import {Nunito} from 'next/font/google'
import {FC} from 'react'

import styles from './footer.module.sass'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.curve}></div>
			<div className={`${styles.content} ${nunito.className}`}>
				&copy; Шелепугин Иван, 2021&ndash;{new Date().getFullYear()}
				<a href='/feed.xml'><i className='icon-rss'></i> RSS</a>
			</div>
		</footer>
	)
}

export default Footer
