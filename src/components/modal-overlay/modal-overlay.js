import modalOverlay from './modal-overlay.module.css';

const ModalOverlay = ({children, onClick}) => {
    return(
      <div className={modalOverlay.overlay} onClick={onClick}>
          {children}
      </div>  
    )    
  }

export default ModalOverlay;