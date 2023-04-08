import Link from 'next/link'
import {FC} from 'react'

import topCurve from '@/assets/top-curve.svg'

import styles from './header.module.sass'
import {Nunito} from '@next/font/google'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})


const Header: FC = () => {
	const backgroundImage = `url('${topCurve.src}')`

	return (
		<header className={styles.header}>
			<div className={styles.content}>
				<h1 className={nunito.className}>Шелепугин Иван</h1>
				<nav>
					<Link href='/'><i className='icon-home'></i></Link>
					{/*<Link href='/projects'></Link>*/}
					<Link href='/blog'><i className='icon-book'></i></Link>
					<Link href='/gallery'><i className='icon-gallery'></i></Link>
					<Link href='/contacts'><i className='icon-contacts'></i></Link>
				</nav>
			</div>
			<div style={{backgroundImage}} className={styles.curve}></div>
		</header>
	)
}

export default Header
