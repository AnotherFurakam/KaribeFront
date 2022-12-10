import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import ModalCloseButton from './styled-component/ModalCloseButton';
import ModalContainer from "./styled-component/ModalContainer";
import ModalHeader from './styled-component/ModalHeader';
import KaribleLogo from '/src/assets/img/LogoKaribe.svg'
import { CgClose } from "react-icons/cg";
import ModalFooter from './styled-component/ModalFooter';
export interface ModalInterface {
	isOpen: boolean,
	children: ReactNode,
	handleCloseModal: () => void
}

const Modal: React.FC<ModalInterface> = ({ isOpen, children, handleCloseModal }) => {
	const container: HTMLElement = document.getElementById('modal') as HTMLElement;

	return (
		createPortal(
			<AnimatePresence>
				{
					isOpen &&
					<ModalContainer
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ ease: 'easeInOut', times: { duration: .05 } }}
						exit={{ opacity: 0, transition: { duration: .05,delay: .1, ease: 'easeInOut' } }}
					>
						<motion.div
							initial={{ opacity: 0, scale: .6 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ ease: 'easeInOut', duration: .05, delay: .05 }}
							exit={{ opacity: 0, scale: .6, transition: { duration: .1, ease: 'easeInOut' } }}
						>
							<ModalHeader>
								<div className='d-flex align-items-center mb-3'>
									<img src={KaribleLogo} className="img-fluid" />
									<div>
										<h1 className='fs-4 m-0 text-primary fw-bolder'>El Karibe</h1>
										<span className='fs-6 m-0 text-primary'>Picantería</span>
									</div>
								</div>
								<div>
									<ModalCloseButton onClick={handleCloseModal}>
										<CgClose color='#fff' size={22} />
									</ModalCloseButton>
								</div>
							</ModalHeader>
							{children}
							<ModalFooter>
								<h1>Karibe Admin</h1>
							</ModalFooter>
						</motion.div>
					</ModalContainer>
				}
			</AnimatePresence>
			, container
		)
	);
};

export default Modal;
