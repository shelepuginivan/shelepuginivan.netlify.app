import {Nunito, Roboto_Flex} from 'next/font/google'
import {FC, FormEvent, useState} from 'react'

import Button from '@/ui/Button/Button'
import Input from '@/ui/Input/Input'
import TextArea from '@/ui/TextArea/TextArea'

import styles from './feedbackForm.module.sass'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const robotoFlex = Roboto_Flex({
	subsets: ['cyrillic', 'latin'],
	weight: '400'
})

const FeedbackForm: FC = () => {
	const [submitted, setSubmitted] = useState<boolean | null>(null)
	const [header, setHeader] = useState<string>('Форма обратной связи')
	const [message, setMessage] = useState<string>('')

	const submitFeedback = async (e: FormEvent) => {
		e.preventDefault()

		type FormField = 'firstname' | 'lastname' | 'email' | 'feedback'

		const form = e.target as unknown as Record<FormField, HTMLInputElement>

		const data: Record<FormField, string> = {
			firstname: form.firstname.value,
			lastname: form.lastname.value,
			email: form.email.value,
			feedback: form.feedback.value
		}

		const res = await fetch('/api/feedback', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const status = res.status
		
		setSubmitted(status === 200)
		setHeader(status === 200 ? 'Отправлено!' : 'Ошибка!')

		if (status !== 200) {
			try {
				const json = await res.json()
				const message = json.message
				setMessage(message ?? '')
			} catch {
				return
			}
		}
	}

	return (
		<div className={styles.formWrapper}>
			<h1
				className={nunito.className}
				data-submitted={submitted}
			>{header}</h1>
			<p className={nunito.className} data-error={submitted === false}>{message}</p>

			<form
				className={`${styles.form} ${robotoFlex.className}`}
				onSubmit={submitFeedback}
			>
				<Input
					className={robotoFlex.className}
					name='firstname'
					id='firstname'
					type='text'
					placeholder='Имя'
					maxLength={64}
				/>
				<Input
					className={robotoFlex.className}
					name='lastname'
					id='lastname'
					type='text'
					placeholder='Фамилия'
					maxLength={128}
				/>
				<Input
					className={robotoFlex.className}
					id='email'
					name='email'
					type='email'
					placeholder='Email'
					maxLength={128}
				/>
				<TextArea
					className={robotoFlex.className}
					id='feedback'
					name='feedback'
					placeholder='Введите ваше сообщение (до 500 символов)'
					maxLength={500}
				/>
				<Button type='submit'>Отправить</Button>
			</form>
		</div>

	)
}

export default FeedbackForm
