import { useState } from "react";
import styles from './pages.module.css';
import { Form } from "../components/form/form";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/actions/user";
import { useDispatch } from "react-redux";


export const ForgotPasswordPage = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = e => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(value))
    .then(() => {
      navigate("/reset-password");
    })
  }

  return (
    <Form title='Востановление пароля' onSubmit={onSubmit} name="forgotForm">
      <EmailInput
        onChange={onChange}
        value={value}
        name={'email'}
        placeholder="Укажите e-mail"
        isIcon={false}
        extraClass="mb-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">Восстановить</Button>
      <p className={`text text_type_main-small text_color_inactive mb-4`}>Вспомнили пароль? <a className={`text text_type_main-small ${styles.link}`} href="/login">Войти</a></p>
    </Form>
  )
}