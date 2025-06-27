import { AnimatePresence, motion, Variants } from 'motion/react'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { useNavigate } from 'react-router'

import { useDebounceCallBack } from '@/shared/lib/hooks/useDebounceCallBack'
import type { timeOfDay } from '@/shared/types'
import { BackButton, CountButton } from '@/shared/ui'

import { useAzkarStore } from '@/entities/data/model/azkarStore'
import { TDirection } from './azkarLayout.types'

import { useSwiped } from './useSwiped'

import { useRouteParams } from '@/shared/lib/hooks/useRouteParams'
import Styles from './AzkarLayout.module.css'

interface Props {
	children: ReactNode
	pathName: timeOfDay
}

export const AzkarLayout = ({ children, pathName }: Props) => {
	const navigate = useNavigate()
	const { id, timeOfDay } = useRouteParams()
	const currentParamsId = id && !isNaN(Number(id)) ? Number(id) : 0
	const isFirstRender = useRef(true)
	const textElement = useRef<HTMLDivElement>(null)
	const [swiped, setSwiped] = useState<TDirection | null>(null)

	const azkarStore = useAzkarStore()

	const debounceNavigate = useDebounceCallBack(
		(path: string) => navigate(path),
		300
	)

	const { handlers } = useSwiped({
		currentParamsId,
		debounceNavigate,
		filteredLength: azkarStore.filteredAzkarsOfTime?.length,
		pathName,
		setSwiped,
	})

	const variants: Variants = {
		exit: (swipe: TDirection) => ({
			x: swipe === 'left' ? -100 : 100,
			opacity: 0,
		}),
		animate: { x: 0 },
	}

	const scrollToTop = useCallback(() => {
		setSwiped('left')
		if (textElement.current?.scrollTop ?? 0 > 100) {
			textElement.current?.scrollTo({ top: 0, behavior: 'auto' })
		}
	}, [])

	useEffect(() => {
		azkarStore.setAzkar(currentParamsId, pathName)
		scrollToTop()
	}, [id, pathName])

	useEffect(() => {
		isFirstRender.current = false
	}, [])

	return (
		<div className={Styles.layout} {...handlers}>
			<div className='absolute -top-0.5 -left-2 flex items-center justify-between w-full'>
				<BackButton absolute={false} />
				<span className='text-dark-accent dark:text-text-white'>
					{azkarStore?.azkar?.id !== undefined ? azkarStore?.azkar?.id + 1 : 0}/
					{azkarStore[`${timeOfDay}Azkars`]?.length}
				</span>
			</div>
			<AnimatePresence mode='wait'>
				<motion.div
					variants={variants}
					key={id}
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
				isAzkarId={
					currentParamsId < azkarStore.filteredAzkarsOfTime?.length - 1
				}
			/>
		</div>
	)
}
