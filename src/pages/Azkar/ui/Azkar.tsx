import { useAzkarStore } from '@/entities/data/model/azkarStore'
import { timeOfDay } from '@/shared/types'
import { AzkarLayout } from '@/widgets/Layouts/AzkarLayout'
import { useEffect } from 'react'
import { useParams } from 'react-router'

import Styles from './Azkar.module.css'

export const Azkar = () => {
	const { azkar, setAzkar } = useAzkarStore()

	const { id, time } = useParams<{ id: string; time: timeOfDay }>()

	const timeOfDay: timeOfDay = time ? time : 'morning'

	useEffect(() => {
		setAzkar(Number(id), timeOfDay)
	}, [])

	return (
		<AzkarLayout pathName={timeOfDay}>
			<div className={Styles.text}>{azkar?.text}</div>
		</AzkarLayout>
	)
}
