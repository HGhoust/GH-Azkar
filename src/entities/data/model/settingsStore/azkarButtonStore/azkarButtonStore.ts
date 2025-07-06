import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IButtonStore {
	buttonSize: string
	setButtonSize: () => void
}

export const useButtonStore = create<IButtonStore>()(
	persist(
		(set, get) => ({
			buttonSize: '3',
			setButtonSize: () => {
				let size = get().buttonSize

				switch (size) {
					case '0':
						size = '1'
						break
					case '1':
						size = '2'
						break
					case '2':
						size = '3'
						break
					default:
						size = '0'
						break
				}
				set({ buttonSize: size })
			},
		}),
		{
			name: 'azkar-button-storage',
			partialize: state => ({ buttonSize: state.buttonSize }),
		}
	)
)
