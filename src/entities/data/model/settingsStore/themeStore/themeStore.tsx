import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TTheme = 'dark' | 'light' | (string & {})

interface IThemeStore {
	theme: TTheme
	setTheme: (theme: TTheme) => void
}

export const useThemeStore = create<IThemeStore>()(
	persist(
		set => ({
			theme: window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light',
			setTheme: theme => set({ theme }),
		}),
		{
			name: 'theme-storage',
			partialize: state => ({
				theme: state.theme,
			}),
		}
	)
)
