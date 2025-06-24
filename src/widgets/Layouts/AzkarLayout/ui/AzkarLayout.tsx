import { AnimatePresence, motion, Variants } from 'motion/react'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { useNavigate, useParams } from 'react-router'

import { useDebounceCallBack } from '@/shared/lib/hooks/useDebounceCallBack'
import type { timeOfDay } from '@/shared/types'
import { BackButton, CountButton } from '@/shared/ui'

import { useAzkarStore } from '@/entities/data/model/azkarStore'
import { TDirection } from './azkarLayout.types'

import { useSwiped } from './useSwiped'

import Styles from './AzkarLayout.module.css'

interface Props {
	children: ReactNode
	pathName: timeOfDay
}

export const AzkarLayout = ({ children, pathName }: Props) => {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const currentParamsId = id && !isNaN(Number(id)) ? Number(id) : 0
	const isFirstRender = useRef(true)
	const textElement = useRef<HTMLDivElement>(null)
	const [swiped, setSwiped] = useState<TDirection | null>(null)

	const { setAzkar, filteredAzkarsOfTime } = useAzkarStore()

	const debounceNavigate = useDebounceCallBack(
		(path: string) => navigate(path),
		300
	)

	const { handlers } = useSwiped({
		currentParamsId,
		debounceNavigate,
		filteredLength: filteredAzkarsOfTime?.length,
		pathName,
		setSwiped,
	})

	const variants: Variants = {
		initial: {
			opacity: isFirstRender.current ? 0 : 1,
		},
		exit: (swipe: TDirection) => ({
			x: swipe === 'left' ? -100 : 100,
			opacity: 0,
		}),
		animate: { x: 0, opacity: 1 },
	}

	const scrollToTop = useCallback(() => {
		setSwiped('left')
		if (textElement.current?.scrollTop ?? 0 > 100) {
			textElement.current?.scrollTo({ top: 0, behavior: 'auto' })
		}
	}, [])

	useEffect(() => {
		setAzkar(currentParamsId, pathName)
		scrollToTop()
	}, [id, pathName])

	useEffect(() => {
		isFirstRender.current = false
	}, [])

	return (
		<div className={Styles.layout} {...handlers}>
			<BackButton />
			<AnimatePresence mode='wait'>
				<motion.div
					variants={variants}
					key={id}
					initial='initial'
					animate='animate'
					exit='exit'
					custom={swiped}
					transition={{ duration: 0.3, ease: 'backIn' }}
					className={Styles.textWrapper}
					ref={textElement}
				>
					{children}
				</motion.div>
			</AnimatePresence>
			<CountButton
				scrollToTop={scrollToTop}
				path={`/${pathName}/${currentParamsId + 1}`}
				isAzkarId={currentParamsId < filteredAzkarsOfTime?.length - 1}
			/>
		</div>
	)
}
