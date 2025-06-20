import { useAzkarStore } from '@/entities/data/model/azkarStore'
import { useModalStore } from '@/entities/data/model/modalStore/modalStore'
import { timeOfDay } from '@/shared/types'
import { PagesLayout } from '@/widgets/Layouts/PagesLayout'
import { useNavigate } from 'react-router'
import { HomeCategory } from './components/Category/HomeCategory'
import { Modal } from './components/Modal'

export const Home = () => {
	const navigate = useNavigate()
	const azkarStore = useAzkarStore()
	const onClick = (time: string) => {
		navigate('/' + time + '/0')
	}

	const timeOfAzkars: timeOfDay[] = ['morning', 'evening', 'bed']
	const { beforeClosed, toggle, children, setBeforeClosed } = useModalStore()

	const onClose = () => {
		toggle()
		setTimeout(() => {
			setBeforeClosed()
		}, 500)
	}

	return (
		<>
			<PagesLayout className='flex flex-col gap-13 overflow-y-scroll pb-20'>
				{beforeClosed && <Modal onClose={onClose}>{children}</Modal>}
				<h1 className=''>GH Azkar</h1>
				{timeOfAzkars.map((time, index) => {
					return (
						<div key={index}>
							<span
								className='absolute right-0 text-sm pt-1.5 text-accent-gray z-10'
								onClick={() => onClick(time)}
							>
								Прочитать
							</span>
							<HomeCategory azkars={azkarStore[`${time}Azkars`]} title={time} />
						</div>
					)
				})}
			</PagesLayout>
		</>
	)
}
