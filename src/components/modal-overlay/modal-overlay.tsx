import { FC, ReactNode } from "react";
import modalOverlay from "./modal-overlay.module.css";

interface IModalOverlay {
  onClick: () => void;
  children?: ReactNode;
}

const ModalOverlay: FC<IModalOverlay> = ({ onClick, children }) => {
  return (
    <div className={modalOverlay.overlay} onClick={onClick}>
      {children}
    </div>
  );
};

export default ModalOverlay;
