import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay ({children}) {
  return (
    <div className={styles.overlay}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
};