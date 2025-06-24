import { ReactNode } from 'react'
import { create } from 'zustand'

interface IModalStore {
	children: ReactNode
	isOpen: boolean
	toggle: () => void
	setChildren: (children: ReactNode) => void
}

export const useModalStore = create<IModalStore>(set => ({
	children: null,
	isOpen: false,
	toggle: () => set(state => ({ isOpen: !state.isOpen })),
	setChildren: children => set({ children }),
}))
