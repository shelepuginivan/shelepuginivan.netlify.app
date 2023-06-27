import axios from 'axios'

import { Feedback } from '@/utils/types/Feedback'

export const submitFeedback = async (feedback: Feedback): Promise<void> => {
	await axios.post('/api/feedback', feedback)
}

