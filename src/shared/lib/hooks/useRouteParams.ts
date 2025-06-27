import { timeOfDay } from '@/shared/types'
import { useParams } from 'react-router'

export function useRouteParams() {
	const { id, time } = useParams<{ id: string; time: timeOfDay }>()
	const timeOfDay: timeOfDay = time ? time : 'morning'

	return {
		timeOfDay,
		id,
	}
}
