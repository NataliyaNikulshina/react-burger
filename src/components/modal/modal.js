import modalStyles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import propTypes from 'prop-types'
import ModalOverlay from '../modal-overlay/modal-overlay.js';
import React from "react";
import ReactDOM from 'react-dom';


const Modal = (props) => {
    const { title, changeVisibility, children } = props
    



const modalRoot = document.getElementById("react-modals");
    return ReactDOM.createPortal(
        <ModalOverlay onClick={() => changeVisibility(false)}>
        <div className={`${modalStyles.popup} pl-10 pr-10 pt-10 pb-15`} onClick={e => e.stopPropagation()}>
            <div className={modalStyles.header}>
                <h2 className='text text_type_main-large mb-8'>{title}</h2>
                <div className={modalStyles.closebtn}>
                <CloseIcon type="primary" onClick={() => changeVisibility(false)}/>
                </div>
            </div >
            {children}
        </div>
        </ModalOverlay>,  
      modalRoot
    )
}

Modal.propTypes = {
    children: propTypes.node.isRequired,
    title: propTypes.string,
    changeVisibility: propTypes.func.isRequired
}

export default Modal;