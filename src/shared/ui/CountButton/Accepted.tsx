import AcceptIcon from '@/shared/assets/icons/accept.svg?react'
import { motion } from 'motion/react'

interface Props {
	isFirstRender: boolean
}

export const Accepted = ({ isFirstRender }: Props) => {
	return (
		<motion.div
			className='flex items-center gap-1.5'
			key='2'
			initial={isFirstRender ? { opacity: 1 } : { opacity: 0 }}
			animate={isFirstRender ? { opacity: 0 } : { opacity: 1 }}
			transition={{ duration: 0.5 }}
			exit={{ opacity: 0 }}
		>
			<motion.span key='completed-mode' transition={{ duration: 0.5 }}>
				Прочитано
			</motion.span>
			<AcceptIcon className='size-4 dark:text-white' />
		</motion.div>
	)
}
