import { FormEvent, useState } from "react";
import styles from './pages.module.css';
import { Form } from "../components/form/form";
import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPasswordThunk } from "../services/actions/user";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";

export const ResetPasswordPage = () => {
  const [form, setValue] = useState({newPassword: '', token: ''});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetPasswordThunk(form.newPassword, form.token, () => {
      navigate("/login");
    }))
  }

  return (
    <Form title='Востановление пароля' onSubmit={onSubmit} name="resetForm">
      <PasswordInput
        onChange={onChange}
        value={form.newPassword}
        name={'newPassword'}
        placeholder="Введите новый пароль"
        icon='ShowIcon'
        extraClass="mb-6"
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={onChange}
        value={form.token}
        name={'token'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">Сохранить</Button>
      <p className={`text text_type_main-small text_color_inactive mb-4`}>Вспомнили пароль? <a className={`text text_type_main-small ${styles.link}`} href="/login">Войти</a></p>
    </Form>
  )
}