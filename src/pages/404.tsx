import Head from 'next/head'

import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'

const NotFound = () => {
	return (
		<>
			<Head>
				<title>404 - Ресурс не найден | Иван Шелепугин</title>
			</Head>
			<main>
				<ErrorMessage
					header='404'
					message='Запрашиваемый ресурс не найден'
				/>
			</main>
		</>
	)
}

export default NotFound
