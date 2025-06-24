import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'
import Styles from './NavigateButton.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string
	active: boolean
}

export const NavigateButton = ({
	children,
	title,
	active,
	className,
	...rest
}: Props) => {
	return (
		<button
			className={clsx(Styles.button, { [Styles.title]: active }, className)}
			{...rest}
		>
			{children}
			<span className='text-sm'>{title}</span>
		</button>
	)
}
