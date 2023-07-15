import styles from './form.module.css';

export const Form = ({children, title, onSubmit, name}) => {
  return (
    <form className={`${styles.formBox} mt-30`} onSubmit={onSubmit} name={name}>
      {title && <h2 className={`text text_type_main-medium mb-6`}>{title}</h2>}
      {children}
    </form>
  )
}