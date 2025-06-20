import { IAzkar, timeOfDay } from '@/shared/types'

export interface IAzkarStore {
	azkars: IAzkar[]
	morningAzkars: IAzkar[]
	eveningAzkars: IAzkar[]
	bedAzkars: IAzkar[]
	filteredAzkarsOfTime: IAzkar[] | []
	currentCount: number
	azkar: IAzkar | null
	setAzkar: (id: number, time: timeOfDay) => void
	decrementCount: () => void
}
