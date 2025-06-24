import { useModalStore } from '@/entities/data/model/modalStore/modalStore'
import { AnimatePresence, motion } from 'motion/react'
import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import Styles from './Modal.module.css'

interface Props {
	onClose: () => void
	children: ReactNode
}

export const Modal = ({ children, onClose }: Props) => {
	const { isOpen } = useModalStore()
	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className={Styles.wrapper}
					animate={{ scale: 1 }}
					initial={{ scale: 0 }}
					exit={{ scale: 0 }}
					onClick={onClose}
					transition={{ duration: 0.2, ease: 'easeOut' }}
				>
					<div className={Styles.childrenWrapper}>{children}</div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	)
}
