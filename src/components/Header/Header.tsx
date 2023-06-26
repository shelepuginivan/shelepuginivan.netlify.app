import { Nunito } from 'next/font/google'
import Link from 'next/link'
import { FC } from 'react'

import styles from './header.module.sass'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<div className={styles.content}>
				<Link href='/'><h1 className={nunito.className}>Шелепугин Иван</h1></Link>
				<nav>
					<Link href='/'><i className='icon-home'></i></Link>
					<Link href='/projects'><i className='icon-projects'></i></Link>
					<Link href='/blog'><i className='icon-book'></i></Link>
					<Link href='/gallery'><i className='icon-gallery'></i></Link>
					<Link href='/contacts'><i className='icon-contacts'></i></Link>
				</nav>
			</div>
			<div className={styles.curve}></div>
		</header>
	)
}

export default Header
