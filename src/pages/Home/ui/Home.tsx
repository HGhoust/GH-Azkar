import { data } from '@/shared/lib/data'
import { timeOfDay } from '@/shared/types'
import { PagesLayout } from '@/widgets/Layouts/PagesLayout'
import { useNavigate } from 'react-router'
import { HomeCategory } from './components/Category/HomeCategory/HomeCategory'
import Styles from './Home.module.css'

export const Home = () => {
	const navigate = useNavigate()

	const onClick = (time: string) => {
		navigate('/' + time + '/0')
	}

	const timeOfAzkars: timeOfDay[] = ['morning', 'evening', 'bed']

	const azkarsOfCategory = (time: timeOfDay) => {
		return data.filter(azkar => azkar.time.includes(time))
	}

	return (
		<>
			<PagesLayout className={Styles.layout}>
				<h1 className=''>GH Azkar</h1>
				{timeOfAzkars.map((time, index) => {
					return (
						<div key={index}>
							<span
								className={Styles.accentButton}
								onClick={() => onClick(time)}
							>
								Прочитать
							</span>
							<HomeCategory azkars={azkarsOfCategory(time)} title={time} />
						</div>
					)
				})}
			</PagesLayout>
		</>
	)
}
