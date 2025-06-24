import { useThemeStore } from '@/entities/data/model/settingsStore'
import { Button } from '@/shared/ui/Button'
import clsx from 'clsx'
import Accept from '../../assets/icons/accept.svg?react'
import { getSettings } from './SettingsSelect.data'
import { ISettings } from './SettingsSelect.types'

import Styles from './SettingsSelect.module.css'

interface Props {
	options: ISettings[]
	optionsName: string[]
	onClick: (name: Props['options'][number]['name']) => void
	className: string
	id: number
}

export const SettingsSelect = ({
	options,
	optionsName,
	onClick,
	className,
	id,
}: Props) => {
	const settings = getSettings()
	const theme = useThemeStore(state => state.theme)

	return (
		<div className={clsx(Styles.wrapper, className)}>
			{options.map(options => {
				return (
					<Button
						key={options.id}
						onClick={e => {
							e.stopPropagation()
							onClick(options.name)
						}}
						className={Styles.button}
						style={{
							backgroundColor: theme === 'dark' ? '#4f4f4f' : '#ffffff',
						}}
					>
						<span>{optionsName[options.id]}</span>
						{settings[id].currentValue === options.name && (
							<Accept className='size-3' />
						)}
					</Button>
				)
			})}
		</div>
	)
}
