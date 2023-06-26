import type { NextApiRequest, NextApiResponse } from 'next'

import { FeedbackService } from '@/server/FeedbackService'
import { ServerException } from '@/server/ServerException'
import { validateFeedbackForm } from '@/utils/validateFeedbackForm'

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	if (req.method !== 'POST') {
		res.status(405).json({
			message: 'Неверный метод запроса'
		})
		return
	}

	const { firstname, lastname, email, feedback } = req.body

	try {
		validateFeedbackForm(firstname, lastname, email, feedback)
	} catch (error) {
		if (error instanceof Error) {
			return res.status(400).json({
				message: error.message
			})
		}
	}

	try {
		await FeedbackService.sendFeedback(
			firstname,
			lastname,
			email,
			feedback
		)

		res.status(200).end()
	} catch (error) {
		if (error instanceof ServerException) {
			res.status(error.status).json({ message: error.message })
		} else {
			res.status(500).json({ message: 'Внутренняя ошибка сервера' })
		}
	}
}

export default handler
