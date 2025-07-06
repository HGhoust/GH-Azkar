import { useAzkarStore } from '@/entities/data/model/azkarStore'
import {
	useAzkarTextStore,
	useButtonStore,
} from '@/entities/data/model/settingsStore'
import ButtonIcon from '@/shared/assets/icons/button.svg?react'
import Settings from '@/shared/assets/icons/settings.svg?react'
import TextIcon from '@/shared/assets/icons/text.svg?react'
import { timeOfDay } from '@/shared/types'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Accepted } from './Accepted'
import { Count } from './Count'
import Styles from './CountButton.module.css'

interface Props {
	scrollToTop: () => void
	path: string
	isAzkarId: boolean
	className?: string
}

export const CountButton = ({
	path,
	isAzkarId,
	scrollToTop,
	className,
}: Props) => {
	const navigate = useNavigate()

	const { decrementCount } = useAzkarStore()
	const { setTranscription, transcription } = useAzkarTextStore()
	const { id } = useParams()
	const location = useLocation()
	const paramsId = Number(id)
	const pathName = location.pathname
	const azkarTime = pathName.split('/')[1] as timeOfDay
	const [buttonSettings, setButtonSettings] = useState<boolean>(false)
	const { buttonSize, setButtonSize } = useButtonStore()

	const { setFontSize } = useAzkarTextStore()

	const isFirstRender = useRef(true)

	const azkars = useAzkarStore(state => state[`${azkarTime}Azkars`])

	const azkar = azkars?.find(azkar => azkar?.id === paramsId)

	const onClick = () => {
		decrementCount(paramsId, azkarTime)
		if (azkar!.count > 1) {
			scrollToTop()
		} else if (isAzkarId) {
			navigate(path)
		} else {
			navigate('/completed')
		}
	}

	const isMiniSize = buttonSize === '1' || buttonSize === '0'

	useEffect(() => {
		isFirstRender.current = false
	}, [])

	return (
		<div
			style={{ flex: buttonSize }}
			className={clsx(className, Styles.countButton)}
			onClick={onClick}
		>
			<AnimatePresence mode='wait'>
				{azkar?.count !== 0 ? (
					<Count azkar={azkar} isFirstRender={isFirstRender.current} />
				) : (
					<Accepted isFirstRender={isFirstRender.current} />
				)}
			</AnimatePresence>
			<span
				className={clsx(
					isMiniSize ? Styles.transcriptionMini : Styles.transcription
				)}
				onClick={e => {
					setTranscription()
					e.stopPropagation()
				}}
			>
				{transcription ? 'Текст' : 'Транскрипция'}
			</span>

			<div
				className={clsx(
					'absolute right-5 flex items-center gap-2',
					isMiniSize
						? `flex-row ${
								buttonSize === '0' ? 'bottom-1/2' : 'bottom-7'
						  } justify-end  translate-y-1/2`
						: 'flex-col bottom-4 w-7'
				)}
			>
				<AnimatePresence mode='wait'>
					{buttonSettings && (
						<motion.div
							initial={isMiniSize ? { width: 0 } : { height: 0 }}
							animate={{ width: 'min-content', height: 'min-content' }}
							exit={isMiniSize ? { width: 50 } : { height: 50 }}
							transition={{ duration: 0.1, ease: 'circInOut' }}
							className={clsx(
								{
									'flex-row px-3 py-1 gap-5': isMiniSize,
								},
								'border border-gray-200 rounded-2xl shadow-sm flex flex-col gap-3 px-1 py-3 bg-white'
							)}
						>
							<TextIcon
								className={clsx(isMiniSize ? 'size-6' : 'size-7')}
								onClick={e => {
									e.stopPropagation()
									setFontSize()
								}}
							/>
							<ButtonIcon
								className={clsx(isMiniSize ? 'size-6' : 'size-7')}
								onClick={e => {
									e.stopPropagation()
									setButtonSize()
								}}
							/>
						</motion.div>
					)}
				</AnimatePresence>
				<button
					onClick={event => {
						event.stopPropagation()
						setButtonSettings(prev => !prev)
					}}
				>
					<Settings className='size-7.5' />
				</button>
			</div>
		</div>
	)
}
