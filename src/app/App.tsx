import { useAzkarStore } from '@/entities/data/model'
import { useModalStore } from '@/entities/data/model/modalStore/modalStore'
import { useThemeStore } from '@/entities/data/model/settingsStore/themeStore/themeStore'
import { Modal } from '@/pages/Home/ui/components/Modal'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import Styles from './App.module.css'
import router from './providers/routes'

export const App = () => {
	const { theme } = useThemeStore()
	const { children, toggle } = useModalStore()

	const { resetDate, resetTimer } = useAzkarStore()

	useEffect(() => {
		document.documentElement.className = theme
	}, [theme])

	useEffect(() => {
		resetDate()
		resetTimer()
	}, [])

	return (
		<>
			<div className={Styles.wrapper}>
				<meta
					name='apple-mobile-web-app-status-bar-style'
					content={theme === 'dark' ? '#4f4f4f' : '#f8f8f8'}
				/>
				<meta
					name='theme-color'
					content={theme === 'dark' ? '#4f4f4f' : '#f8f8f8'}
				/>
				<RouterProvider router={router} />
				<Modal onClose={toggle}>{children}</Modal>
			</div>
		</>
	)
}
