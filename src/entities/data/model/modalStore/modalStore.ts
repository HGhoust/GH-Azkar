import { ReactNode } from 'react'
import { create } from 'zustand'

interface IModalStore {
	children: ReactNode
	isOpen: boolean
	toggle: () => void
	setBeforeClosed: () => void
	beforeClosed: boolean
	setChildren: (children: ReactNode) => void
}

export const useModalStore = create<IModalStore>(set => ({
	children: null,
	isOpen: false,
	beforeClosed: false,
	toggle: () => set(state => ({ isOpen: !state.isOpen })),
	setBeforeClosed: () => set(state => ({ beforeClosed: !state.beforeClosed })),
	setChildren: children => set({ children }),
}))
