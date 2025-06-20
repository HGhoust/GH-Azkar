import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import Styles from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
}

export const Button = ({ children, className, ...rest }: Props) => {
	return (
		<button className={clsx(className, Styles.button)} {...rest}>
			{children}
		</button>
	)
}
