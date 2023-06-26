import { Author, FeedOptions } from 'feed'

import { getHost } from '@/utils/getHost'

export const FIRSTNAME_MAX_LENGTH = 64
export const LASTNAME_MAX_LENGTH = 128
export const EMAIL_MAX_LENGTH = 128
export const FEEDBACK_MAX_LENGTH = 500

export const author: Author = {
	name: 'Иван Шелепугин',
	email: 'shelepuginivanm@gmail.com',
	link: getHost()
}

export const feedOptions: FeedOptions = {
	title: 'Статьи Ивана Шелепугина',
	description: 'Блог Ивана Шелепугина',
	id: getHost(),
	link: getHost(),
	language: 'ru',
	image: getHost(),
	favicon: `${getHost()}/favicon.png`,
	copyright: `Все права защищены 2021-${new Date().getFullYear()}, Иван Шелепугин`,
	author
}
