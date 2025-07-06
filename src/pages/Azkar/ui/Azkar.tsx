import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'

import {
	useAzkarStore,
	useAzkarTextStore,
	useFontFamilyStore,
} from '@/entities/data/model'

import { useRouteParams } from '@/shared/lib/hooks/useRouteParams'
import { AzkarLayout } from '@/widgets/Layouts/AzkarLayout'
import Styles from './Azkar.module.css'

export const Azkar = () => {
	const { setAzkar, azkar } = useAzkarStore()
	const { fontFamily } = useFontFamilyStore()
	const { fontSize } = useAzkarTextStore()
	const { id, timeOfDay } = useRouteParams()
	const isFirstRender = useRef(true)

	const { transcription } = useAzkarTextStore()

	useEffect(() => {
		isFirstRender.current = false
		setAzkar(Number(id), timeOfDay)
	}, [])

	return (
		<AzkarLayout pathName={timeOfDay}>
			{transcription === true && (
				<motion.div
					animate={isFirstRender.current ? { opacity: 0 } : { opacity: 1 }}
					initial={isFirstRender.current ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.7 }}
					className={Styles.text}
					style={{ fontFamily, fontSize }}
				>
					{azkar?.transcription}
				</motion.div>
			)}

			{transcription === false && (
				<motion.div
					animate={isFirstRender.current ? { opacity: 0 } : { opacity: 1 }}
					initial={isFirstRender.current ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.5 }}
					className={Styles.textArabic}
					style={{ fontFamily, fontSize }}
				>
					{azkar?.text}
				</motion.div>
			)}
		</AzkarLayout>
	)
}
