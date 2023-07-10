import { useState, useEffect, useRef } from "react";
import styles from './pages.module.css';
import { Form } from "../components/form/form";
import { Button, PasswordInput, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { ProfileNavigation } from "../components/profile-navigation/profile-navigation";
import { updateUserInfo, getUserInfo } from "../services/actions/user";

export const ProfilePage = () => {
  const [form, setFormValue] = useState({email: '', password: '', name: ''});
  const [disabled, setDisabled] = useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const updateUserRequest = useSelector(
    (store) => store.user.updateUserRequest
  );

  const user = useSelector((store) => store.user.user);
  
  const [isChanging, setChanging] = useState(false);
  const [isFocus, setFocus] = useState(true);

  const onChange = e => {
    setFormValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(updateUserInfo(form)).then(() => {
      setChanging(false);
    });
  }

  const onNameBlur = () => {
    setFocus(true);
  };

  const onFocus = () => {
    setChanging(true);
  };
  
  const resetForm = () => {
    setChanging(false);
    setFormValue(user);
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormValue(user);
    }
  }, [user, setFormValue]);

  const onEditNameClick = () => {

  }

  return (
    <div className={`${styles.profile__page}`}>
    <ProfileNavigation/>
    <Form>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChange}
        icon={"EditIcon"}
        value={form.name}
        name={"name"}
        error={false}
        ref={inputRef}
        onIconClick={onEditNameClick}
        onBlur={onNameBlur}
        errorText={"Ошибка"}
        size={"default"}
        disabled={isFocus}
        extraClass="profile__input"
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
        onFocus={onFocus}
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
        onFocus={onFocus}
      />
       {isChanging && (
          <div className={styles.handlers}>
            <Button
              htmlType="reset"
              type="secondary"
              size="large"
              onClick={resetForm}
            >
              Отмена
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              onClick={onSubmit}
            >
              {updateUserRequest ? "Сохраняется" : "Сохранить"}
            </Button>
          </div>
        )}
    </Form>
    </div>
  )
}