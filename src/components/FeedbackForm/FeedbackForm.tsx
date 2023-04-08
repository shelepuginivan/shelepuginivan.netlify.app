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

		const form = e.target as Record<FormField, HTMLInputElement>

		const data: Record<FormField, string> = {
			firstname: form.firstname.value,
			lastname: form.lastname.value,
			email: form.email.value,
			feedback: form.feedback.value
		}

		const req = await fetch('/api/feedback', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		
		setSubmitted(req.status === 200)
		setHeader(req.status === 200 ? 'Отправлено!' : 'Ошибка!')

		try {
			const json = await req.json()
			const message = json.message
			setMessage(message ?? '')
		} catch {
			return
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
				<Input className={robotoFlex.className} placeholder='Имя' type='text' id='firstname' name='firstname'/>
				<Input className={robotoFlex.className} placeholder='Фамилия' type='text' id='lastname' name='lastname'/>
				<Input className={robotoFlex.className} placeholder='Email' type='email' id='email' name='email'/>
				<TextArea className={robotoFlex.className} placeholder='Введите ваше сообщение...' id='feedback' name='feedback'/>
				<Button type='submit'>Отправить</Button>
			</form>
		</div>

	)
}

export default FeedbackForm
