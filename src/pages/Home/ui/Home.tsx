import { useAzkarStore } from '@/entities/data/model'
import { data } from '@/shared/lib/data'
import { timeOfDay } from '@/shared/types'
import { PagesLayout } from '@/widgets/Layouts/PagesLayout'
import { useNavigate } from 'react-router'
import { HomeCategory } from './components/Category/HomeCategory/HomeCategory'
import Styles from './Home.module.css'

export const Home = () => {
	const navigate = useNavigate()
	const azkarStore = useAzkarStore()

	const notAcceptedAzkar = (time: timeOfDay) =>
		azkarStore[`${time}Azkars`].find(azkar => azkar.count !== 0)

	const onClick = (time: timeOfDay) => {
		const getNotAccepted = notAcceptedAzkar(time)?.id
		navigate('/' + time + '/' + (getNotAccepted ? getNotAccepted : 0))
	}

	const timeOfAzkars: timeOfDay[] = ['morning', 'evening', 'bed']

	const azkarsOfCategory = (time: timeOfDay) => {
		return data
			.filter(azkar => azkar.time.includes(time))
			.map((azkar, index) => {
				return { ...azkar, id: index }
			})
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
