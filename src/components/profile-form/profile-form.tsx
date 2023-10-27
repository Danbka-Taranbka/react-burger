import { useState, useEffect, useRef } from "react";
import { Form } from "../form/form";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUserInfoThunk, getUserInfoThunk } from "../../services/actions/user";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export const ProfileForm = () => {
  const [form, setFormValue] = useState({email: '', password: '', name: ''});
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const updateUserRequest = useAppSelector(
    (store) => store.user.updateUserRequest
  );

  const user = useAppSelector((store) => store.user.user);
  
  const [isChanging, setChanging] = useState(false);
  const [isFocus, setFocus] = useState(true);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormValue({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserInfoThunk(form))
    setChanging(false);
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
    dispatch(getUserInfoThunk());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormValue(user);
    }
  }, [user, setFormValue]);

  const onEditNameClick = () => {
    setTimeout(() => inputRef.current!.focus(), 0);
    setChanging(true);
    setFocus(false);
  }

  return (
    <Form onSubmit={onSubmit} name="form">
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
            >
              {updateUserRequest ? "Сохраняется" : "Сохранить"}
            </Button>
          </div>
        )}
    </Form>
  )
}