import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IThemeStore {
	theme: 'dark' | 'light'
	toggleTheme: () => void
}

export const useThemeStore = create<IThemeStore>()(
	persist(
		(set, get) => ({
			theme: window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light',
			toggleTheme: () =>
				set({
					theme: get().theme === 'dark' ? 'light' : 'dark',
				}),
		}),
		{
			name: 'theme-storage',
			partialize: state => ({
				theme: state.theme,
			}),
		}
	)
)
