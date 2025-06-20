import { NavigateBar } from '@/widgets/NavigateBar'
import clsx from 'clsx'
import { ReactNode } from 'react'
import Styles from './PagesLayout.module.css'

interface Props {
	children: ReactNode
	className?: string
}

export const PagesLayout = ({ children, className }: Props) => {
	return (
		<>
			<div className={clsx(Styles.wrapper, className)}>{children}</div>
			<div className='absolute bottom-0 right-0'>
				<NavigateBar />
			</div>
		</>
	)
}
