import Settings from '@/shared/assets/icons/settings.svg?react'
import { IconComponent } from '@/shared/types'
import { NavigateButton } from '@/shared/ui/NavigateButton'
import { useLocation, useNavigate } from 'react-router'
import Category from '../assets/icons/category.svg?react'
import People from '../assets/icons/people.svg?react'
import { navigateBarButtons } from './navigateBar.data'

import Styles from './NavigateBar.module.css'

const iconMap: Record<string, IconComponent> = {
	Category,
	Settings,
	People,
}

export const NavigateBar = () => {
	const location = useLocation()
	const navigate = useNavigate()

	return (
		<div className={Styles.wrapper}>
			{navigateBarButtons.map(button => {
				const Button = iconMap[button.name]
				return (
					<NavigateButton
						key={button.name}
						title={button.title}
						active={location.pathname === button.path}
						onClick={() => navigate(button.path)}
					>
						<Button className={Styles.button} key={button.name} />
					</NavigateButton>
				)
			})}
		</div>
	)
}
