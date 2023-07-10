import { useState } from "react";
import styles from './pages.module.css';
import { Form } from "../components/form/form";
import { Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { ProfileNavigation } from "../components/profile-navigation/profile-navigation";

export const ProfilePage = () => {
  const [form, setValue] = useState({email: '', password: '', name: ''});
  const [disabled, setDisabled] = useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onIconClick = () => {
    setDisabled(!disabled);

  }

  const onSubmit = e => {
    e.preventDefault();
  }
  
  return (
    <div className={`${styles.profile__page}`}>
    <ProfileNavigation/>
    <Form>
      <Input type={'text'} 
        placeholder={'Имя'}
        onChange={onChange}
        value={form.name}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
        icon={'EditIcon'}
        disabled={disabled}
        onIconClick={onIconClick}
      />

      <Input type={'email'} 
        placeholder={'Логин'}
        onChange={onChange}
        value={form.login}
        name={'email'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
        icon={'EditIcon'}
      />

      <Input type={'password'} 
        placeholder={'Пароль'}
        onChange={onChange}
        value={form.password}
        name={'password'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
        icon={'EditIcon'}
      />
    </Form>
    </div>
  )
}