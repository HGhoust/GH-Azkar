import { useAzkarStore } from '@/entities/data/model/azkarStore'
import { useAzkarTextStore } from '@/entities/data/model/settingsStore'
import AcceptIcon from '@/shared/assets/icons/accept.svg?react'
import { timeOfDay } from '@/shared/types'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { useLocation, useNavigate, useParams } from 'react-router'
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

	return (
		<div className={clsx(className, Styles.countButton)} onClick={onClick}>
			<AnimatePresence mode='wait'>
				{azkar?.count !== 0 ? (
					<div className='flex items-center gap-1'>
						<motion.span
							key='1'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
						>
							Осталось
						</motion.span>
						<motion.span
							key='count-mode'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
							exit={{ opacity: 0 }}
						>
							{azkar?.count}
						</motion.span>
					</div>
				) : (
					<motion.div
						className='flex items-center gap-1.5'
						key='2'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						exit={{ opacity: 0 }}
					>
						<motion.span key='completed-mode' transition={{ duration: 0.5 }}>
							Прочитано
						</motion.span>
						<AcceptIcon className='size-4 dark:text-white' />
					</motion.div>
				)}
			</AnimatePresence>
			<span
				className={Styles.transcription}
				onClick={e => {
					setTranscription()
					e.stopPropagation()
				}}
			>
				{transcription ? 'Текст' : 'Транскрипция'}
			</span>
		</div>
	)
}
