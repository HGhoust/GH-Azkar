import type { timeOfDay } from '@/shared/types'

import { useAzkarStore } from '@/entities/data/model/azkarStore'
import { useDebounceCallBack } from '@/shared/lib/hooks/useDebounceCallBack'
import { BackButton } from '@/shared/ui/BackButton'
import { CountButton } from '@/shared/ui/CountButton'
import { AnimatePresence, motion, Variants } from 'motion/react'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useSwipeable } from 'react-swipeable'
import Styles from './AzkarLayout.module.css'

interface Props {
	children: ReactNode
	pathName: timeOfDay
}

export const AzkarLayout = ({ children, pathName }: Props) => {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const currentParamsId = id && !isNaN(Number(id)) ? Number(id) : 0

	const [swiped, setSwiped] = useState<'left' | 'right' | null>(null)

	const { setAzkar, filteredAzkarsOfTime } = useAzkarStore()

	const debounceNavigate = useDebounceCallBack(
		(path: string) => navigate(path),
		300
	)

	const isAzkarId = currentParamsId < filteredAzkarsOfTime.length - 1

	const variants: Variants = {
		initial: (swipe: 'left' | 'right') => ({
			x: swipe === 'left' ? 600 : -600,
			opacity: 0,
		}),
		animate: { x: 0, opacity: 1 },
	}

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (isAzkarId) {
				setSwiped('left')
				debounceNavigate(`/${pathName}/${currentParamsId + 1}`)
			}
		},
		onSwipedRight: () => {
			if (currentParamsId > 0) {
				setSwiped('right')
				debounceNavigate(`/${pathName}/${currentParamsId - 1}`)
			}
		},
		trackTouch: true,
		trackMouse: true,
	})

	const textElement = useRef<HTMLDivElement>(null)

	const scrollToTop = () => {
		if (textElement.current?.scrollTop ?? 0 > 100) {
			textElement.current?.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	useEffect(() => {
		setAzkar(currentParamsId, pathName)
		scrollToTop()
	}, [id, pathName])

	return (
		<AnimatePresence>
			<motion.div
				className={Styles.layout}
				variants={variants}
				{...handlers}
				key={id}
				initial='initial'
				animate='animate'
				custom={swiped}
				transition={{ duration: 0.2, ease: 'easeOut' }}
			>
				<BackButton />
				<div className={Styles.textWrapper} ref={textElement}>
					{children}
				</div>
				<CountButton
					scrollToTop={scrollToTop}
					path={`/${pathName}/${currentParamsId + 1}`}
					isAzkarId={isAzkarId}
				/>
			</motion.div>
		</AnimatePresence>
	)
}
