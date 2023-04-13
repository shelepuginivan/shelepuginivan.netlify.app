import {Nunito, Roboto_Flex} from 'next/font/google'
import {FC, FormEvent, useState} from 'react'

import Button from '@/ui/Button/Button'
import Input from '@/ui/Input/Input'
import TextArea from '@/ui/TextArea/TextArea'
import {EMAIL_MAX_LENGTH, FEEDBACK_MAX_LENGTH, FIRSTNAME_MAX_LENGTH, LASTNAME_MAX_LENGTH} from '@/utils/constants'

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

		setSubmitted(status < 400)
		setHeader(status < 400 ? 'Отправлено!' : 'Ошибка!')

		if (status >= 400) {
			try {
				const json = await res.json()
				const message = json.message
				setMessage(message ?? '')
			} catch (e) {
				if (e instanceof Error) {
					setMessage(e.message)
				}
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
					maxLength={FIRSTNAME_MAX_LENGTH}
				/>
				<Input
					className={robotoFlex.className}
					name='lastname'
					id='lastname'
					type='text'
					placeholder='Фамилия'
					maxLength={LASTNAME_MAX_LENGTH}
				/>
				<Input
					className={robotoFlex.className}
					id='email'
					name='email'
					type='email'
					placeholder='Email'
					maxLength={EMAIL_MAX_LENGTH}
				/>
				<TextArea
					className={robotoFlex.className}
					id='feedback'
					name='feedback'
					placeholder={`Введите ваше сообщение (до ${FEEDBACK_MAX_LENGTH} символов)`}
					maxLength={FEEDBACK_MAX_LENGTH}
				/>
				<Button type='submit'>Отправить</Button>
			</form>
		</div>

	)
}

export default FeedbackForm
