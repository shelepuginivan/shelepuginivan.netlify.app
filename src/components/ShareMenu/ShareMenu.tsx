import { Nunito, Roboto_Flex } from 'next/font/google'
import { FC, useCallback, useState } from 'react'

import Button from '@/ui/Button/Button'
import { getHost } from '@/utils/getHost'

import styles from './shareMenu.module.sass'

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '400'
})

const robotoFlex = Roboto_Flex({
	subsets: ['cyrillic', 'latin'],
	weight: '400'
})

const ShareMenu: FC<{slug: string}> = ({ slug }) => {
	const [header, setHeader] = useState<string>('Поделиться')
	const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
	const [message, setMessage] = useState<string>('')
	
	const shareLink = `${getHost()}/blog/${slug}`

	const clipUrl = useCallback(async () => {
		if (!navigator.clipboard) {
			setIsSuccess(false)
			setHeader('Ошибка!')
			setMessage('Ваш браузер не поддерживает данную функцию')
		}

		try {
			await navigator.clipboard.writeText(shareLink)

			setIsSuccess(true)
			setHeader('Успех!')
			setMessage('Ссылка скопирована в буфер обмена')
		} catch {
			setIsSuccess(false)
			setHeader('Ошибка!')
			setMessage('Не удалось скопировать ссылку')
		}
	}, [shareLink])

	const share = useCallback(async () => {
		if (!navigator.share) {
			setIsSuccess(false)
			setHeader('Ошибка!')
			setMessage('Ваш браузер не поддерживает данную функцию')
		}

		try {
			await navigator.share({ url: shareLink })

			setIsSuccess(true)
			setHeader('Успех!')
			setMessage('Спасибо, что поделились статьёй')
		} catch (e) {
			if (e instanceof DOMException) {
				if (
					e.code !== DOMException.ABORT_ERR &&
					e.name !== 'ABORT_ERR'
				) {
					setIsSuccess(false)
					setHeader('Ошибка!')
					setMessage('Не удалось поделиться статьёй')
				}
			}
		}
	}, [shareLink])

	return (
		<menu className={`${styles.menu} ${robotoFlex.className}`}>
			<h1
				className={nunito.className}
				data-succeed={isSuccess}
			>{header}</h1>
			<p
				className={styles.errorMessage}
			>{message}</p>

			<Button onClick={share}>Поделиться</Button>
			<p>или</p>
			<Button onClick={clipUrl}>Скопировать ссылку</Button>
		</menu>
	)
}

export default ShareMenu
