import Dua from '@/shared/assets/icons/dua.svg?react'
import Note from '@/shared/assets/icons/note.svg?react'
import Quran from '@/shared/assets/icons/quran.svg?react'
import { IAzkar, timeOfDay } from '@/shared/types'
import { TAzkarName } from '@/shared/types/azkarTypes'
import { titles } from '../../../model/homeCategory.data'
import { IconHomeCategoryObj } from '../../../types/homeCategory.types'
import { HomeCategoryCard } from './HomeCategoryCard'

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
	console.log(azkars)
	return (
		<div className='overflow-x-scroll py-1'>
			<h3 className='sticky left-0'>{titles[title]}</h3>
			<div className='flex items-center gap-2.5 pt-3'>
				{azkars.map(azkar => {
					const Icon = getIcon(azkar.name, iconMap)
					return <HomeCategoryCard Icon={Icon} azkar={azkar} key={azkar.id} />
				})}
			</div>
		</div>
	)
}
