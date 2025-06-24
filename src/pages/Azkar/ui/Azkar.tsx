import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'

import { useParams } from 'react-router'

import {
	useAzkarStore,
	useAzkarTextStore,
	useFontFamilyStore,
} from '@/entities/data/model'

import { timeOfDay } from '@/shared/types'
import { AzkarLayout } from '@/widgets/Layouts/AzkarLayout'
import Styles from './Azkar.module.css'

export const Azkar = () => {
	const { azkar, setAzkar } = useAzkarStore()
	const { fontFamily } = useFontFamilyStore()

	const { id, time } = useParams<{ id: string; time: timeOfDay }>()
	const isFirstRender = useRef(true)

	const timeOfDay: timeOfDay = time ? time : 'morning'
	const { transcription } = useAzkarTextStore()

	useEffect(() => {
		setAzkar(Number(id), timeOfDay)
		isFirstRender.current = false
	}, [])

	return (
		<AzkarLayout pathName={timeOfDay}>
			{transcription === true && (
				<motion.div
					animate={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					transition={{ duration: 0.7 }}
					className={Styles.text}
					style={{ fontFamily }}
				>
					{azkar?.transcription}
				</motion.div>
			)}

			{transcription === false && (
				<motion.div
					animate={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className={Styles.textArabic}
					style={{ fontFamily }}
				>
					{azkar?.text}
				</motion.div>
			)}
		</AzkarLayout>
	)
}
