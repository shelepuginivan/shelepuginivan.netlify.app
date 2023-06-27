import { BadRequest } from '@/server/ServerException'
import { EMAIL_MAX_LENGTH, FEEDBACK_MAX_LENGTH, FIRSTNAME_MAX_LENGTH, LASTNAME_MAX_LENGTH } from '@/utils/constants'
import { Feedback } from '@/utils/types/Feedback'

export const validateFeedbackForm = (feedback: unknown): Feedback => {
	const { firstname, lastname, email, message } = feedback

	const nameRegexp = /^[A-Za-zА-Яёа-я-]*$/
	const emailRegexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

	if (![firstname, lastname, email, message].every(Boolean)) {
		throw new BadRequest('Одно или несколько полей не заполнены. Заполните все поля')
	}

	if (firstname.length > FIRSTNAME_MAX_LENGTH) {
		throw new BadRequest(`Превышена допустимая длина имени (${FIRSTNAME_MAX_LENGTH} символов)`)
	}

	if (lastname.length > LASTNAME_MAX_LENGTH) {
		throw new BadRequest(`Превышена допустимая длина фамилии (${LASTNAME_MAX_LENGTH} символов)`)
	}

	if (email.length > EMAIL_MAX_LENGTH) {
		throw new BadRequest(`Превышена допустимая длина email (${EMAIL_MAX_LENGTH} символов)`)
	}

	if (message.length > FEEDBACK_MAX_LENGTH) {
		throw new BadRequest(`Превышена допустимая длина сообщения (${FEEDBACK_MAX_LENGTH} символов)`)
	}

	if (!nameRegexp.test(firstname) || !nameRegexp.test(lastname)) {
		throw new BadRequest('Имя и фамилия содержат недопустимые символы')
	}

	if (!emailRegexp.test(email)) {
		throw new Error('Введите валидный email')
	}

	return feedback as Feedback
}
