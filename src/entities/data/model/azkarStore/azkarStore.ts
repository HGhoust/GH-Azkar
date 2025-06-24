import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { azkarStoreActions } from './actions'
import { IAzkarStore } from './azkarStore.types'
import { resetAzkars } from './utils'

export const useAzkarStore = create<IAzkarStore>()(
	persist(
		(set, get) => ({
			filteredAzkarsOfTime: [],
			azkar: null,
			morningAzkars: resetAzkars('morning') ?? [],
			eveningAzkars: resetAzkars('evening') ?? [],
			bedAzkars: resetAzkars('bed') ?? [],
			...azkarStoreActions(set, get),
		}),
		{
			name: 'azkar-storage',
			partialize: state => ({
				morningAzkars: state.morningAzkars,
				eveningAzkars: state.eveningAzkars,
				bedAzkars: state.bedAzkars,
			}),
		}
	)
)
