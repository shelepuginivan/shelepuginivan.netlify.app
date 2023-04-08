import type { NextApiRequest, NextApiResponse } from 'next'

import {FeedbackService} from '@/utils/FeedbackService'

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	if (req.method !== 'POST') {
		res.status(405).end()
		return
	}

	const {firstname, lastname, email, feedback} = req.body

	if (![firstname, lastname, email, feedback].every(Boolean)) {
		res.status(400).json({
			message: 'Одно или несколько полей не заполнены. Заполните все поля'
		})
		return
	}

	try {
		await FeedbackService.sendFeedback(
			firstname,
			lastname,
			email,
			feedback
		)

		res.status(200).end()
	} catch {
		res.status(500).json({
			message: 'На сервере произошла ошибка! Повторите поыптку позже'
		})
	}
}

export default handler
