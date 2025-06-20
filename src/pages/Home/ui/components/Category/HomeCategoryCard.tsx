import { useModalStore } from '@/entities/data/model/modalStore/modalStore'
import { IAzkar, IconComponent } from '@/shared/types'

interface Props {
	azkar: IAzkar
	Icon: IconComponent
}

export const HomeCategoryCard = ({ azkar, Icon }: Props) => {
	const { setChildren, toggle, setBeforeClosed } = useModalStore()

	const onClick = () => {
		toggle()
		setBeforeClosed()
		setChildren(
			<div className='h-full pt-5'>
				<div className='absolute top-3 left-3  flex items-end gap-2'>
					<Icon className='size-9' />
					<span className='text-lg font-bold text-accent-gray '>
						№{azkar.id + 1}
					</span>
				</div>
				<p className='text-2xl p-5 text-right leading-11 items-center'>
					{azkar.text}
				</p>
			</div>
		)
	}

	return (
		<>
			<button
				className='min-w-50 min-h-30 p-3  rounded-xl bg-white shadow-sm flex flex-col gap-1 items-start'
				onClick={onClick}
			>
				<div className='flex items-center gap-2'>
					<Icon className='size-5' />№{azkar.id + 1}
				</div>
				<div>{azkar.name}</div>
				<div className='text-accent-gray'>Повторений {azkar.count}</div>
			</button>
		</>
	)
}
