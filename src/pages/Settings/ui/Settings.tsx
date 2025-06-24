import { useModalStore } from '@/entities/data/model/modalStore/modalStore'
import { Button } from '@/shared/ui/Button'
import { PagesLayout } from '@/widgets/Layouts/PagesLayout'
import Styles from './Settings.module.css'
import { SettingsSelect } from './components/SettingsSelect'
import { getSettings } from './components/SettingsSelect.data'
import { ISettings } from './components/SettingsSelect.types'

export const Settings = () => {
	const { toggle, setChildren } = useModalStore()

	const settings = getSettings()

	const openSettings = (
		setSetting: (value: string) => void,
		options: ISettings[],
		optionsName: string[],
		id: number
	) => {
		toggle()
		setChildren(
			<SettingsSelect
				id={id}
				className='z-30'
				onClick={setSetting}
				options={options}
				optionsName={optionsName}
			/>
		)
	}

	return (
		<PagesLayout>
			<div className={Styles.wrapper}>
				{settings.map((setting, index) => {
					return (
						<Button
							key={index}
							onClick={() =>
								openSettings(
									setting.setValue,
									setting.options,
									setting.optionsName,
									index
								)
							}
						>
							{setting.title}
						</Button>
					)
				})}
			</div>
		</PagesLayout>
	)
}
