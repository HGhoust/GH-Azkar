import Dua from '@/shared/assets/icons/dua.svg?react'
import Note from '@/shared/assets/icons/note.svg?react'
import Quran from '@/shared/assets/icons/quran.svg?react'

import { titles } from '@/pages/Home/model/homeCategory.data'
import { IconHomeCategoryObj } from '@/pages/Home/types/homeCategory.types'
import { IAzkar, TAzkarName, timeOfDay } from '@/shared/types'
import { HomeCategoryCard } from '../HomeCategoryCard/HomeCategoryCard'

import Styles from './HomeCategory.module.css'

interface Props {
	azkars: IAzkar[]
	title: timeOfDay
}

const iconMap: IconHomeCategoryObj = {
	Quran: Quran,
	Dua: Dua,
	Zikr: Note,
}

const getIcon = (name: TAzkarName, iconMap: IconHomeCategoryObj) => {
	const reName = name !== 'Dua' ? (name !== 'Zikr' ? 'Quran' : 'Zikr') : 'Dua'
	return iconMap[reName]
}

export const HomeCategory = ({ azkars, title }: Props) => {
	return (
		<div className={Styles.wrapper}>
			<h3 className={Styles.title}>{titles[title]}</h3>
			<div className={Styles.azkars}>
				{azkars.map((azkar, index) => {
					const Icon = getIcon(azkar.name, iconMap)
					return <HomeCategoryCard Icon={Icon} azkar={azkar} key={index} />
				})}
			</div>
		</div>
	)
}
