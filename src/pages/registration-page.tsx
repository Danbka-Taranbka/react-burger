import {FormEvent, useState } from "react";
import styles from './pages.module.css';
import { Form } from "../components/form/form";
import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { createUserThunk } from "../services/actions/user";
import { useAppDispatch } from "../hooks/hooks";

export const RegistrationPage = () => {
  const [form, setValue] = useState({email: '', password: '', name: ''});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createUserThunk(form, (() => {
      navigate("/login")
    })
    ))
  }

  return (
    <Form title='Регистрация' onSubmit={onSubmit} name="regForm">
      <Input type={'text'} 
      placeholder={'Имя'}
      onChange={onChange}
      value={form.name}
      name={'name'}
      error={false}
      errorText={'Ошибка'}
      size={'default'}
      />
      <EmailInput
      placeholder={'E-mail'}
      onChange={onChange}
      value={form.email}
      name={'email'}
      />
      <PasswordInput 
      placeholder={'Пароль'}
      onChange={onChange}
      value={form.password}
      name={'password'}
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">Зарегестрироваться</Button>
      <p className={`text text_type_main-small text_color_inactive`}>Уже зарегестрированы? <a className={`text text_type_main-small ${styles.link}`} href="/login">Войти</a></p>
    </Form>
  )
}