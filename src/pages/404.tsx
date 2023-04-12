import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage'

const NotFound = () => {
	return (
		<main>
			<ErrorMessage
				header='404'
				message='Запрашиваемый ресурс не найден'
			/>
		</main>
	)
}

export default NotFound
