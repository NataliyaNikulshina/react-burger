import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from "prop-types";
import PortalReactDOM from "react-dom";
import React from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ title, onClose, children }) => {
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose(e);
      }
    };
    window.addEventListener("keyup", handleEsc);

    console.log('в модалке')

    return () => {
      window.removeEventListener("keyup", handleEsc);
    };
  }, []);

  return PortalReactDOM.createPortal(
    <>
      <div
        className={`${modalStyles.popup} pl-10 pr-10 pt-10 pb-15`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={modalStyles.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <div className={modalStyles.closebtn} onClick={onClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  children: propTypes.node.isRequired,
  title: propTypes.string,
  onClose: propTypes.func.isRequired,
};

export default Modal;
