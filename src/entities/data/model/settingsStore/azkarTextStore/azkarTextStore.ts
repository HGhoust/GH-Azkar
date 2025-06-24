import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IAzkarTextStore {
	transcription: boolean
	setTranscription: () => void
}

export const useAzkarTextStore = create<IAzkarTextStore>()(
	persist(
		(set, get) => ({
			transcription: false,
			setTranscription: () => {
				set({ transcription: !get().transcription })
			},
		}),
		{
			name: 'azkar-text-storage',
			partialize: state => ({ transcription: state.transcription }),
		}
	)
)
