import {EMAIL_MAX_LENGTH, FEEDBACK_MAX_LENGTH, FIRSTNAME_MAX_LENGTH, LASTNAME_MAX_LENGTH} from '@/utils/constants'

export const validateFeedbackForm = (
	firstname: string,
	lastname: string,
	email: string,
	feedback: string
): void => {
	const nameRegexp = /^[A-Za-zА-Яёа-я-]*$/
	const emailRegexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

	if (![firstname, lastname, email, feedback].every(Boolean)) {
		throw new Error('Одно или несколько полей не заполнены. Заполните все поля')
	}

	if (firstname.length > FIRSTNAME_MAX_LENGTH) {
		throw new Error(`Превышена допустимая длина имени (${FIRSTNAME_MAX_LENGTH} символов)`)
	}

	if (lastname.length > LASTNAME_MAX_LENGTH) {
		throw new Error(`Превышена допустимая длина фамилии (${LASTNAME_MAX_LENGTH} символов)`)
	}

	if (email.length > EMAIL_MAX_LENGTH) {
		throw new Error(`Превышена допустимая длина email (${EMAIL_MAX_LENGTH} символов)`)
	}

	if (feedback.length > FEEDBACK_MAX_LENGTH) {
		throw new Error(`Превышена допустимая длина сообщения (${FEEDBACK_MAX_LENGTH} символов)`)
	}

	if (!nameRegexp.test(firstname) || !nameRegexp.test(lastname)) {
		throw new Error('Имя и фамилия содержат недопустимые символы')
	}

	if (!emailRegexp.test(email)) {
		throw new Error('Введите валидный email')
	}
}
