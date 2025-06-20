import { useNavigate } from 'react-router'
import Styles from './BackButton.module.css'

export const BackButton = () => {
	const navigate = useNavigate()
	return (
		<div className={Styles.button} onClick={() => navigate('/')}>
			<img className='size-7' src='/assets/icons/back.svg' alt='back' />
			<span>Назад</span>
		</div>
	)
}
