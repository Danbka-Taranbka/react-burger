import styles from './modal-overlay.module.css';

export default function ModalOverlay ({children}) {
  return (
    <div className={styles.overlay}>
      {children}
    </div>
  )
}