import { IconComponent } from '@/shared/types'
import { Button } from '@/shared/ui/Button'

import { PagesLayout } from '@/widgets/Layouts/PagesLayout'

import { aboutUsButtons } from '../model/AboutUs.data'

import Styles from './AboutUs.module.css'

import Instagram from '../assets/icons/instagram.svg?react'
import Telegram from '../assets/icons/telegram.svg?react'

const iconMap: Record<string, IconComponent> = {
	telegram: Telegram,
	instagram: Instagram,
}
export const AboutUs = () => {
	return (
		<PagesLayout>
			<div className={Styles.wrapper}>
				{aboutUsButtons.map(button => {
					const ButtonIcon = iconMap[button.img]
					return (
						<a href={button.url} target='_blank' key={button.id}>
							<Button className={Styles.button}>
								<ButtonIcon className='size-5' />
								<span>{button.name}</span>
							</Button>
						</a>
					)
				})}
			</div>
		</PagesLayout>
	)
}
