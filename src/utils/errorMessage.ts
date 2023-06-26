import { AxiosError } from 'axios'

export const errorMessage = (error: unknown): string => {
	if (error instanceof AxiosError) {
		return error.response?.data?.message ?? error.message
	}

	if (error instanceof Error) {
		return error.message
	}

	return 'Произошла неизвестная ошибка'
}
