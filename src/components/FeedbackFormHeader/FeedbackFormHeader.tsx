import { MutationStatus } from '@tanstack/query-core'
import { Nunito } from 'next/font/google'
import { FC } from 'react'

import { errorMessage } from '@/utils/errorMessage'

import styles from './feedbackFormHeader.module.sass'

type PropsType = {
	error: unknown
	status: MutationStatus
}

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: '300'
})

const FeedbackFormHeader: FC<PropsType> = ({ error, status }) => {
	const headerText = (() => {
		switch (status) {
		case 'error': return 'Ошибка!'
		case 'loading': return 'Подождите...'
		case 'success': return 'Отправлено!'
		default: return 'Форма обратной связи'
		}
	})()
	
	return (
		<div className={styles.feedbackFormHeader}>
			<h1
				className={nunito.className}
				data-status={status}
			>
				{headerText}
			</h1>
			<p
				className={nunito.className}
				data-error={status === 'error'}
			>
				{errorMessage(error)}
			</p>
		</div>
	)
}

export default FeedbackFormHeader
