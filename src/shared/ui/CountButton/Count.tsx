import { IAzkar } from '@/shared/types'
import { motion } from 'motion/react'

interface Props {
	azkar?: IAzkar
	isFirstRender: boolean
}

export const Count = ({ azkar, isFirstRender }: Props) => {
	return (
		<div className='flex items-center gap-1'>
			<motion.span
				key='1'
				initial={isFirstRender ? { opacity: 1 } : { opacity: 0 }}
				animate={isFirstRender ? { opacity: 0 } : { opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}
			>
				Осталось
			</motion.span>
			<motion.span
				key='count-mode'
				initial={isFirstRender ? { opacity: 1 } : { opacity: 0 }}
				animate={isFirstRender ? { opacity: 0 } : { opacity: 1 }}
				transition={{ duration: 0.5 }}
				exit={{ opacity: 0 }}
			>
				{azkar?.count}
			</motion.span>
		</div>
	)
}
