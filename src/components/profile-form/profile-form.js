import { useState, useEffect, useRef } from "react";
import { Form } from "../form/form";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo, getUserInfo } from "../../services/actions/user";

export const ProfileForm = () => {
  const [form, setFormValue] = useState({email: '', password: '', name: ''});
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
    setTimeout(() => inputRef.current.focus(), 0);
    setChanging(true);
    setFocus(false);
  }

  return (
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
      />

      <Input type={'email'} 
        placeholder={'Логин'}
        onChange={onChange}
        value={form.email}
        name={'email'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
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
        icon={'EditIcon'}
        onFocus={onFocus}
      />
       {isChanging && (
          <div>
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
  )
}