import { useEffect, FC, ReactNode } from "react";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from "prop-types";
import PortalReactDOM from "react-dom";
import React from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModal {
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: FC<IModal> = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: { key: string }) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keyup", handleEsc);

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

// Modal.propTypes = {
//   children: propTypes.node.isRequired,
//   title: propTypes.string,
//   onClose: propTypes.func.isRequired,
// };

export default Modal;
