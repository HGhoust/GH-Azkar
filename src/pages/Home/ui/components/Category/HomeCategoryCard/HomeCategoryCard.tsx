import { useModalStore } from '@/entities/data/model/modalStore/modalStore'
import { IAzkar, IconComponent } from '@/shared/types'

import Styles from './HomeCategoryCard.module.css'
import { HomeCategoryCardModal } from './HomeCategoryCardModal'

interface Props {
	azkar: IAzkar
	Icon: IconComponent
}

export const HomeCategoryCard = ({ azkar, Icon }: Props) => {
	const { setChildren, toggle } = useModalStore()

	const onClick = () => {
		toggle()
		setChildren(<HomeCategoryCardModal Icon={Icon} azkar={azkar} />)
	}

	return (
		<>
			<button className={Styles.cardButton} onClick={onClick}>
				<div className={Styles.iconWrapper}>
					<Icon className={Styles.icon} />№{azkar.id + 1}
				</div>
				<div>{azkar.name}</div>
				<div className={Styles.count}>Повторений {azkar.count}</div>
			</button>
		</>
	)
}
