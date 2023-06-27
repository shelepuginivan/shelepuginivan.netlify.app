import { useMutation } from '@tanstack/react-query'

import { submitFeedback } from '@/api/feedback'
import { Feedback } from '@/utils/types/Feedback'

export const useSubmitFeedbackMutation = () =>
	useMutation({
		mutationFn: (feedback: Feedback) => submitFeedback(feedback),
		mutationKey: ['feedback']
	})
