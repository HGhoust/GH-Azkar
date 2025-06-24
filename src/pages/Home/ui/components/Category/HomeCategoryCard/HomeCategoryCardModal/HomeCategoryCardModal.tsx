import { useFontFamilyStore } from '@/entities/data/model'
import { IAzkar, IconComponent } from '@/shared/types'
import Styles from './HomeCategoryCardModal.module.css'

interface Props {
	azkar: IAzkar
	Icon: IconComponent
}

export const HomeCategoryCardModal = ({ azkar, Icon }: Props) => {
	const { fontFamily } = useFontFamilyStore()
	return (
		<div className={Styles.modalWrapper}>
			<div className={Styles.modalIconWrapper}>
				<Icon className={Styles.modalIcon} />
				<span className={Styles.modalIconText}>№{azkar.id + 1}</span>
			</div>
			<p style={{ fontFamily }} className={Styles.modalAzkarText}>
				{azkar.text}
			</p>
		</div>
	)
}
