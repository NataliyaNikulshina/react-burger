import modalOverlay from "./modal-overlay.module.css";
import PortalReactDOM from 'react-dom'
import propTypes from 'prop-types'
import React from 'react'

const modalRoot = document.getElementById('react-modals')

const withOverlay = WrappedComponent => props => {
    const { setClose } = props

    React.useEffect(() => {
        if (!setClose) return;
        
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
              setClose(false)
            }
        };
        window.addEventListener('keyup', handleEsc);

        return () => {
        window.removeEventListener('keyup', handleEsc);
        };
    }, [setClose]);

    return PortalReactDOM.createPortal(
        <div className={modalOverlay.overlay} onClick={() => setClose(false)}>
            <WrappedComponent {...props}/>
        </div>,
        modalRoot
    )
}

withOverlay.propTypes = {
    children: propTypes.node.isRequired,
    header: propTypes.string.isRequired,
    setIsOpen: propTypes.func.isRequired
}

export default withOverlay;




/*const ModalOverlay = ({ onClick, children }) => {
  const modalRoot = document.getElementById("react-modals");

  return (
    <div
      className={modalOverlay.overlay}
      onClick={onClick}
    >
      {children}
    </div>
  )
};

export default ModalOverlay;
*/