import { timeOfDay } from '@/shared/types'
import { StateCreator } from 'zustand'
import { IAzkarStore } from './azkarStore.types'
import { resetAzkars } from './utils'

export const azkarStoreActions = (
	set: Parameters<StateCreator<IAzkarStore>>[0],
	get: Parameters<StateCreator<IAzkarStore>>[1]
) => ({
	resetDate: () => {
		const today = new Date().toLocaleDateString('ru')
		const resetForTime = (time: timeOfDay) => {
			const lastReset = localStorage.getItem(`azkar-last-reset-${time}`)
			if (lastReset !== today) {
				set({ [`${time}Azkars`]: resetAzkars(time) })
				localStorage.setItem(`azkar-last-reset-${time}`, today)
			}
		}

		resetForTime('morning')
		resetForTime('evening')
		resetForTime('bed')
	},

	resetTimer: () => {
		const now = new Date()
		const nextReset = new Date()
		nextReset.setHours(24, 0, 0, 0)

		let msUntilMidnight = nextReset.getTime() - now.getTime()
		if (msUntilMidnight < 0) {
			msUntilMidnight = 1000 * 60 * 60 * 24
		}
		setTimeout(() => {
			get().resetDate()

			get().resetTimer()
		}, msUntilMidnight)
	},

	setAzkar: (id: number, time: timeOfDay) => {
		const filtered = resetAzkars(time)

		const stored = get()[`${time}Azkars`]

		const merged = filtered.map(filteredAzkar => {
			const existing = stored.find(
				storedAzkar =>
					storedAzkar.name === filteredAzkar.name &&
					storedAzkar.text === filteredAzkar.text
			)
			return existing ?? filteredAzkar
		})

		const found = merged.find(a => a.id === id) ?? null
		set({
			azkar: found,
			filteredAzkarsOfTime: merged,
			[`${time}Azkars`]: merged,
		})
	},

	decrementCount: (id: number, time: timeOfDay) => {
		const updated = get()[`${time}Azkars`].map(azkar => {
			if (azkar.id === id) {
				return { ...azkar, count: Math.max(azkar.count - 1, 0) }
			}
			return azkar
		})
		set({ [`${time}Azkars`]: updated })
	},
})
