import styles from './form.module.css';
import { FC } from "react";
import { TForm } from '../../utils/types';

export const Form: FC<TForm> = ({children, title, onSubmit, name}) => {
  return (
    <form className={`${styles.formBox} mt-30`} onSubmit={onSubmit} name={name}>
      {title && <h2 className={`text text_type_main-medium mb-6`}>{title}</h2>}
      {children}
    </form>
  )
}