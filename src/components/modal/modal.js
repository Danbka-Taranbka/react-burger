import { useRef, useEffect} from "react";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

export default function Modal ({children, onClose}) {
  const modalContainer = useRef();

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleOverlayClose = (e) => {
      if (!modalContainer.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlayClose);
    };

  }, []);

  return createPortal(
    <ModalOverlay>
      <div ref={modalContainer} className={`p-10 ${styles.modal}`}>
        <div className={styles.close_icon} onClick={onClose}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById("react-modals")
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};