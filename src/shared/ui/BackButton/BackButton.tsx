import clsx from 'clsx'
import { useNavigate } from 'react-router'
import Styles from './BackButton.module.css'

interface Props {
	absolute?: boolean
}

export const BackButton = ({ absolute = true }: Props) => {
	const navigate = useNavigate()
	return (
		<div
			className={clsx(Styles.button, { [Styles.buttonAbsolute]: absolute })}
			onClick={() => navigate('/')}
		>
			<img className='size-7' src='/assets/icons/back.svg' alt='back' />
			<span>Назад</span>
		</div>
	)
}
