import { Button } from '@/shared/ui/Button'
import { useNavigate } from 'react-router'
import Styles from './Completed.module.css'

export const Completed = () => {
	const navigate = useNavigate()
	return (
		<>
			<div className={Styles.wrapper}>
				<h3 className={Styles.text}>Вы справились</h3>
				<Button onClick={() => navigate('/')}>
					Вернуться на главный экран
				</Button>
			</div>
		</>
	)
}
