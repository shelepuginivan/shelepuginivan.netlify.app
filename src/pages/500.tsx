import Head from 'next/head'

import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'

const InternalServerError = () => {
	return (
		<>
			<Head>
				<title>500 - Внутренняя ошибка сервера | Иван Шелепугин</title>
			</Head>
			<main>
				<ErrorMessage
					header='500'
					message='Внутренняя ошибка сервера'
				/>
			</main>
		</>
	)
}

export default InternalServerError
