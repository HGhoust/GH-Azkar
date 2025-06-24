import { useFontFamilyStore } from '@/entities/data/model/settingsStore'
import { useThemeStore } from '@/entities/data/model/settingsStore/themeStore/themeStore'

interface ISetting {
	name: string
	id: number
}

export const fonts: ISetting[] = [
	{
		name: 'Aria',
		id: 0,
	},
	{
		name: 'Noto Naskh Arabic',
		id: 1,
	},
	{
		name: 'Aref Ruqaa',
		id: 2,
	},
]

export const themes: ISetting[] = [
	{
		name: 'light',
		id: 0,
	},
	{
		name: 'dark',
		id: 1,
	},
]

export const getSettings = () => {
	const theme = useThemeStore(state => state.theme)
	const setTheme = useThemeStore(state => state.setTheme)
	const fontFamily = useFontFamilyStore(state => state.fontFamily)
	const setFontFamily = useFontFamilyStore(state => state.setFontFamily)

	return [
		{
			title: 'Тема',
			currentValue: theme,
			setValue: setTheme,
			options: themes,
			optionsName: ['Светлая', 'Тёмная'],
		},
		{
			title: 'Шрифт',
			currentValue: fontFamily,
			setValue: setFontFamily,
			options: fonts,
			optionsName: fonts.map(f => f.name),
		},
	]
}
