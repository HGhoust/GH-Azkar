import { useModalStore } from '@/entities/data/model/modalStore/modalStore'
import clsx from 'clsx'
import { motion } from 'motion/react'
import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

interface Props extends PropsWithChildren {
	onClose: () => void
}

export const Modal = ({ onClose, children }: Props) => {
	const { isOpen } = useModalStore()
	return createPortal(
		<motion.div
			className={clsx(
				'fixed inset-0 z-40 bg-dark-gray/50 backdrop-blur-sm flex justify-center items-center'
			)}
			animate={{ scale: isOpen ? 1 : 0 }}
			initial={{ scale: 0 }}
			onClick={onClose}
			transition={{ duration: 0.2, ease: 'easeOut' }}
		>
			<div className='relative w-[85%] h-[85%] bg-white flex items-center justify-center rounded-2xl z-50 overflow-y-scroll p-4'>
				{children}
			</div>
		</motion.div>,
		document.body
	)
}
