import { Nunito, Roboto_Flex } from 'next/font/google'
import Image from 'next/image'
import { FC } from 'react'

import phone from '@/assets/phone.png'

import styles from './social.module.sass'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const robotoFlex = Roboto_Flex({
	subsets: ['latin'],
	weight: '400'
})

const Social: FC = () => {
	return (
		<div className={styles.social}>
			<div>
				<h1 className={nunito.className}>Контакты</h1>

				<ul className={robotoFlex.className}>
					<li>
						<i className='icon-contacts'> </i>
						<a href='mailto:shelepuginivanm@gmail.com'>shelepuginivanm@gmail.com</a>
					</li>
					<li>
						<i className='icon-telegram'> </i>
						<a href='https://t.me/shelepugin_ivan'>https://t.me/shelepugin_ivan</a>
					</li>
					<li>
						<i className='icon-vk'> </i>
						<a href='https://vk.com/shelepuginivan'>https://vk.com/shelepuginivan</a>
					</li>
					<li>
						<i className='icon-github'> </i>
						<a href='https://github.com/shelepuginivan'>https://github.com/shelepuginivan</a>
					</li>
				</ul>
			</div>
			<Image src={phone} alt=''/>
		</div>
	)
}

export default Social
