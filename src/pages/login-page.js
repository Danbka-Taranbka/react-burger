import { useState } from "react";
import styles from './pages.module.css';
import { Form } from "../components/form/form";
import { Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";


export const LoginPage = () => {
  const [form, setValue] = useState({email: '', password: ''});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch((form.newPassword, form.token))
    .then(() => {
      navigate("/login");
    })
  }

  return (
    <Form title='Вход'>
      <EmailInput
        onChange={onChange}
        value={form.value}
        name={'email'}
        placeholder="Логин"
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onChange}
        value={form.password}
        name={'password'}
        extraClass="mb-6"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={onSubmit}>Войти</Button>
      <p className={`text text_type_main-small text_color_inactive mb-4`}>Вы - новый пользователь? <a className={`text text_type_main-small ${styles.link}`} href="/register">Зарегестрироваться</a></p>
      <p className={`text text_type_main-small text_color_inactive`}>Забыли пароль? <a className={`text text_type_main-small ${styles.link}`} href="/forgot-password">Восстановить пароль</a></p>
    </Form>
  )
}