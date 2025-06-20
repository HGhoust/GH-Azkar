import { useThemeStore } from '@/entities/data/model/themeStore/themeStore'
import { Button } from '@/shared/ui/Button'
import { PagesLayout } from '@/widgets/Layouts/PagesLayout'
import Styles from './Settings.module.css'

export const Settings = () => {
	const { theme, toggleTheme } = useThemeStore()
	return (
		<PagesLayout>
			<div className={Styles.wrapper}>
				<Button onClick={toggleTheme}>
					Сменить тему на {theme === 'dark' ? 'Светлую' : 'Темную'} (Beta)
				</Button>
			</div>
		</PagesLayout>
	)
}
