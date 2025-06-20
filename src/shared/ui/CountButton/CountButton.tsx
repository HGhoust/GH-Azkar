import { useAzkarStore } from '@/entities/data/model/azkarStore'
import { useNavigate } from 'react-router'
import Styles from './CountButton.module.css'

interface Props {
	scrollToTop: () => void
	path: string
	isAzkarId: boolean
}

export const CountButton = ({ path, isAzkarId, scrollToTop }: Props) => {
	const navigate = useNavigate()

	const { currentCount, decrementCount } = useAzkarStore()

	const onClick = () => {
		if (currentCount > 1) {
			decrementCount()
			scrollToTop()
		} else if (isAzkarId) {
			navigate(path)
		} else {
			navigate('/completed')
		}
	}

	return (
		<div className={Styles.countButton} onClick={onClick}>
			<span>Осталось {currentCount}</span>
		</div>
	)
}
