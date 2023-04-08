import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
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

	console.log(firstname, lastname, email, feedback)

	res.status(200).end()
}
