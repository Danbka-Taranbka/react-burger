import {useState, useRef} from "react";
import styles from './pages.module.css';
import { Form } from "../components/form/form";
import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { createUser } from "../services/actions/user";

export const RegistrationPage = () => {
  const [form, setValue] = useState({email: '', password: '', name: ''});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createUser(form.email, form.password, form.name))
    .then(() => {
      navigate("/");
    })
  }

  return (
    <Form title='Регистрация'>
      <Input type={'text'} 
      placeholder={'Имя'}
      onChange={onChange}
      value={form.name}
      name={'name'}
      error={false}
      errorText={'Ошибка'}
      size={'default'}
      extraClass="mb-6"
      />
      <Input type={'email'} 
      placeholder={'E-mail'}
      onChange={onChange}
      value={form.email}
      name={'email'}
      error={false}
      errorText={'Ошибка'}
      size={'default'}
      extraClass="mb-6"
      />
      <Input type={'password'} 
      placeholder={'Пароль'}
      icon={'ShowIcon'}
      onChange={onChange}
      value={form.password}
      name={'password'}
      error={false}
      errorText={'Ошибка'}
      size={'default'}
      extraClass="mb-6"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={onSubmit}>Зарегестрироваться</Button>
      <p className={`text text_type_main-small text_color_inactive`}>Уже зарегестрированы? <a className={`text text_type_main-small ${styles.link}`} href="/login">Войти</a></p>
    </Form>
  )
}