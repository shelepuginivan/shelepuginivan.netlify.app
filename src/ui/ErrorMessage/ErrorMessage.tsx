import { Nunito, Roboto_Flex } from 'next/font/google'
import Link from 'next/link'
import { FC } from 'react'

import styles from './errorMessage.module.sass'

type PropsType = {
	header?: string
	message: string
}

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const robotoFlex = Roboto_Flex({
	subsets: ['cyrillic'],
	weight: '400'
})

const ErrorMessage: FC<PropsType> = ({ message, header }) =>
	<div className={styles.errorMessage}>
		<h1 className={nunito.className}>{header ?? 'Произошла ошибка!'}</h1>
		<p className={robotoFlex.className}>{message}</p>
		<Link href='/'><i className='icon-home'></i></Link>
	</div>

export default ErrorMessage
