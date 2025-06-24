import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IFontFamily {
	fontFamily: string
	setFontFamily: (font: string) => void
}

export const useFontFamilyStore = create<IFontFamily>()(
	persist(
		set => ({
			fontFamily: 'Arial',
			setFontFamily: font => set({ fontFamily: font }),
		}),
		{
			name: 'font-storage',
			partialize: state => ({
				fontFamily: state.fontFamily,
			}),
		}
	)
)
