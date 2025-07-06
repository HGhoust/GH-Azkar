import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IAzkarTextStore {
	transcription: boolean
	setTranscription: () => void
	fontSize: string
	setFontSize: () => void
}

export const useAzkarTextStore = create<IAzkarTextStore>()(
	persist(
		(set, get) => ({
			transcription: false,
			setTranscription: () => {
				set({ transcription: !get().transcription })
			},
			fontSize: '24px',
			setFontSize() {
				let size = get().fontSize

				switch (size) {
					case '24px':
						size = '28px'
						break
					case '28px':
						size = '32px'
						break
					case '32px':
						size = '44px'
						break

					default:
						size = '24px'
						break
				}

				set({
					fontSize: size,
				})
			},
		}),
		{
			name: 'azkar-text-storage',
			partialize: state => ({
				transcription: state.transcription,
				fontSize: state.fontSize,
			}),
		}
	)
)
