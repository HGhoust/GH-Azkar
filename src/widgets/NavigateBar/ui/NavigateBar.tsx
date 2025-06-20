import { IconComponent } from '@/shared/types'
import { NavigateButton } from '@/shared/ui/NavigateButton'
import { useLocation, useNavigate } from 'react-router'
import Category from '../assets/icons/category.svg?react'
import People from '../assets/icons/people.svg?react'
import Settings from '../assets/icons/settings.svg?react'
import { navigateBarButtons } from './navigateBar.data'

const iconMap: Record<string, IconComponent> = {
	Category,
	Settings,
	People,
}

export const NavigateBar = () => {
	const location = useLocation()
	const navigate = useNavigate()

	return (
		<div className='bg-dark-gray h-24 w-dvw z-10 flex justify-between shadow-sm pb-5'>
			{navigateBarButtons.map(button => {
				const Button = iconMap[button.name]
				return (
					<NavigateButton
						key={button.name}
						title={button.title}
						active={location.pathname === button.path}
						onClick={() => navigate(button.path)}
					>
						<Button className='size-9' key={button.name} />
					</NavigateButton>
				)
			})}
		</div>
	)
}
