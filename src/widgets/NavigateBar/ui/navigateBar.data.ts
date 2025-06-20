import { ROUTER_PATH } from '@/shared/config/constants'

interface INavigateBarButtons {
	name: string
	path: string
	title: string
}

export const navigateBarButtons: INavigateBarButtons[] = [
	{
		title: 'О нас',
		name: 'People',
		path: ROUTER_PATH.aboutUs,
	},
	{
		title: 'Категории',
		name: 'Category',
		path: ROUTER_PATH.home,
	},
	{
		title: 'Настройки',
		name: 'Settings',
		path: ROUTER_PATH.settings,
	},
]
