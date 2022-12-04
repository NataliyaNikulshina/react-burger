import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from "prop-types";


const Modal = (props) => {
  const { title, setClose, children } = props;
  
  return (
      <div
        className={`${modalStyles.popup} pl-10 pr-10 pt-10 pb-15`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={modalStyles.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <div className={modalStyles.closebtn} onClick={() => setClose(false)}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>
  );
};

Modal.propTypes = {
  children: propTypes.node.isRequired,
  title: propTypes.string,
  setClose: propTypes.func.isRequired,
};

export default Modal;
