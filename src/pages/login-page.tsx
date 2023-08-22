import { useState, useCallback, FormEvent } from "react";
import styles from './pages.module.css';
import { Form } from "../components/form/form";
import { Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUserThunk } from "../services/actions/user";
import { useAppDispatch } from "../hooks/hooks";


export const LoginPage = () => {
  const [form, setValue] = useState({email: '', password: ''});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(loginUserThunk(form, () => {
        if (location.state !== null && location.state.from) {
          navigate(location.state.from.pathname);
        } else {
          navigate("/");
        }
      }))
    },
    [form, dispatch, location.state, navigate]
  );

  return (
    <Form title='Вход' onSubmit={onSubmit} name="loginForm">
      <EmailInput
        onChange={onChange}
        value={form.email}
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
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">Войти</Button>
      <p className={`text text_type_main-small text_color_inactive mb-4`}>Вы - новый пользователь? <a className={`text text_type_main-small ${styles.link}`} href="/register">Зарегестрироваться</a></p>
      <p className={`text text_type_main-small text_color_inactive`}>Забыли пароль? <a className={`text text_type_main-small ${styles.link}`} href="/forgot-password">Восстановить пароль</a></p>
    </Form>
  )
}