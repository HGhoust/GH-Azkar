export interface IButton {
	name: string
	path: string
	azk: boolean
	id: number
}

export const buttons: IButton[] = [
	{
		name: 'Утренние',
		path: 'morning',
		azk: true,
		id: 1,
	},
	{
		name: 'Вечерние',
		path: 'evening',
		azk: true,
		id: 2,
	},
	{
		name: 'Перед сном',
		path: 'bed',
		azk: true,
		id: 3,
	},
	{
		name: 'Настройки',
		path: 'settings',
		azk: false,
		id: 4,
	},
	{
		name: 'О нас',
		path: 'about-us',
		azk: false,
		id: 5,
	},
]
