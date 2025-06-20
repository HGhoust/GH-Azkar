import { data } from '@/shared/lib/data/data'
import { IAzkar, timeOfDay } from '@/shared/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IAzkarStore } from './azkarStore.types'

const filterOfTime = (arr: IAzkar[], time: timeOfDay) =>
	arr.filter(azkar => azkar.time.includes(time))

const reIndexAzkars = (azkars: IAzkar[]) =>
	azkars.map((azkar, index) => {
		return { ...azkar, id: index }
	})

export const useAzkarStore = create<IAzkarStore>()(
	persist(
		(set, get) => ({
			azkars: data,
			filteredAzkarsOfTime: [],
			currentCount: 0,
			azkar: null,
			morningAzkars: reIndexAzkars(filterOfTime(data, 'morning')),
			eveningAzkars: reIndexAzkars(filterOfTime(data, 'evening')),
			bedAzkars: reIndexAzkars(filterOfTime(data, 'bed')),
			setAzkar: (id, time) => {
				const filtered = filterOfTime(get()!.azkars, time)
				const reIndexed: IAzkar[] = reIndexAzkars(filtered)
				const found = reIndexed.find(azkar => azkar.id === id) || null
				set({
					azkar: found,
					currentCount: found?.count ?? 0,
					filteredAzkarsOfTime: reIndexed,
				})
			},
			decrementCount: () => {
				const current = get().currentCount
				if (current > 0) {
					set({
						currentCount: current - 1,
					})
				}
			},
		}),
		{
			name: 'azkar-storage',
			partialize: state => ({
				currentCount: state.currentCount,
			}),
		}
	)
)
