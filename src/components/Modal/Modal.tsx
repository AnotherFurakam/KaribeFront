import { GenericFieldHTMLAttributes } from 'formik';
import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
export interface ModalInterface {
	isOpen: boolean,
	children: ReactNode
}

const Modal : React.FC<ModalInterface> = ({isOpen, children}) => {
	const modalContainer: HTMLElement =  document.getElementById('modal') as HTMLElement;
	return createPortal(
		isOpen&&(
			<>
				{children}
			</>
		)
		,modalContainer
	);
};

export default Modal;
