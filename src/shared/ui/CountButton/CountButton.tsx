import { useAzkarStore } from '@/entities/data/model/azkarStore'
import { useAzkarTextStore } from '@/entities/data/model/settingsStore'
import { timeOfDay } from '@/shared/types'
import clsx from 'clsx'
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
	const azkarTime = location.pathname.split('/')[1] as timeOfDay

	const azkars = useAzkarStore(state => state[`${azkarTime}Azkars`])

	const azkar = azkars?.find(azkar => azkar?.id === paramsId)

	const onClick = () => {
		if (azkar!.count > 1) {
			decrementCount(paramsId, azkarTime)
			scrollToTop()
		} else if (isAzkarId) {
			decrementCount(paramsId, azkarTime)
			navigate(path)
		} else {
			navigate('/completed')
		}
	}

	return (
		<div className={clsx(className, Styles.countButton)} onClick={onClick}>
			<span>Осталось {azkar?.count}</span>
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
