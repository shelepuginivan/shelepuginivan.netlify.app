import {Nunito, Roboto_Flex} from 'next/font/google'
import {FC} from 'react'

import {errorMessage} from './errorMessage.module.sass'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const robotoFlex = Roboto_Flex({
	subsets: ['cyrillic'],
	weight: '400'
})

const ErrorMessage: FC<{message: string}> = ({message}) =>
	<div className={errorMessage}>
		<h1 className={nunito.className}>Произошла ошибка!</h1>
		<p className={robotoFlex.className}>{message}</p>
		<a href='/'><i className='icon-home'></i></a>
	</div>

export default ErrorMessage
