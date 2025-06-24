import { IAzkar, timeOfDay } from '@/shared/types'

export interface IAzkarStore {
	morningAzkars: IAzkar[]
	eveningAzkars: IAzkar[]
	bedAzkars: IAzkar[]
	filteredAzkarsOfTime: IAzkar[] | []
	azkar: IAzkar | null
	resetDate: () => void
	resetTimer: () => void
	setAzkar: (id: number, time: timeOfDay) => void
	decrementCount: (id: number, time: timeOfDay) => void
}
