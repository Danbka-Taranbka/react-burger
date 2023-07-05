import styles from './form.module.css';

export const Form = ({children, title}) => {
  return (
    <div className={`${styles.formBox} mt-30`}>
      <h2 className={`text text_type_main-medium mb-6`}>{title}</h2>
      {children}
    </div>
  )
}