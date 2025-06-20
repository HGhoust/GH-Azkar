import { useThemeStore } from '@/entities/data/model/themeStore/themeStore'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import Styles from './App.module.css'
import router from './providers/routes'

export const App = () => {
	const { theme } = useThemeStore()

	useEffect(() => {
		document.documentElement.className = theme
	}, [theme])

	return (
		<>
			<div className={Styles.wrapper}>
				<RouterProvider router={router} />
			</div>
		</>
	)
}
