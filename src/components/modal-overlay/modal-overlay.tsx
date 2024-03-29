import styles from './modal-overlay.module.css';
import { FC } from "react";
import { TModalOverlay } from '../../services/types/data';

export const  ModalOverlay: FC<TModalOverlay> = ({children}) => {
  return (
    <div className={styles.overlay}>
      {children}
    </div>
  )
}