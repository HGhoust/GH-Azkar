import { data } from '@/shared/lib/data'
import { IAzkar, timeOfDay } from '@/shared/types'

export const filterOfTime = (arr: IAzkar[], time: timeOfDay) =>
	arr.filter(azkar => azkar.time.includes(time))

export const resetAzkars = (time: timeOfDay) => {
	return filterOfTime(data, time).map((azkar, index) => ({
		...azkar,
		id: index,
	}))
}
