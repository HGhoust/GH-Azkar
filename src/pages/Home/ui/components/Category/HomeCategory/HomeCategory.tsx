import AcceptIcon from '@/shared/assets/icons/accept.svg?react'
import Dua from '@/shared/assets/icons/azkar/dua.svg?react'
import Note from '@/shared/assets/icons/azkar/note.svg?react'
import Quran from '@/shared/assets/icons/azkar/quran.svg?react'

import { titles } from '@/pages/Home/model/homeCategory.data'
import { IconHomeCategoryObj } from '@/pages/Home/types/homeCategory.types'
import { IAzkar, TAzkarName, timeOfDay } from '@/shared/types'
import { HomeCategoryCard } from '../HomeCategoryCard/HomeCategoryCard'

import { useAzkarStore } from '@/entities/data/model'
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
	const store = useAzkarStore()

	const counts = store[`${title}Azkars`]
		.map(azkar => azkar.count)
		.filter(count => count !== 0)

	return (
		<div className={Styles.wrapper}>
			<div className={Styles.title}>
				<h3>{titles[title]}</h3>
				{counts.length === 0 && <AcceptIcon className='size-5' />}
			</div>
			<div className={Styles.azkars}>
				{azkars.map((azkar, index) => {
					const Icon = getIcon(azkar.name, iconMap)
					return <HomeCategoryCard Icon={Icon} azkar={azkar} key={index} />
				})}
			</div>
		</div>
	)
}
