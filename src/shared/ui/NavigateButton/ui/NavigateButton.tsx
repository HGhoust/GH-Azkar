import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

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
			className={clsx(
				'flex flex-col w-full h-full gap-1 justify-center items-center text-accent-gray',
				{
					'text-black': active,
				},
				className
			)}
			{...rest}
		>
			{children}
			<span className='text-sm'>{title}</span>
		</button>
	)
}
