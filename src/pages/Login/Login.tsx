import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "@/services";

import { Link, Navigate } from "react-router-dom";
import cn from "clsx";
import { ChangeEvent, FormEvent, useState } from "react";
import { ILoginData, login } from "@/services/ducks/user";
import { PathsRoutes } from "@/shared/routes.ts";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => ({
    user: state.user,
  }));

  const handleSetValue =
    (type: keyof ILoginData) => (e: ChangeEvent<HTMLInputElement>) => {
      setLoginData({ ...loginData, [type]: e.target.value });
    };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ ...loginData }));
  };

  if (user.isAuthenticated)
    return <Navigate to={PathsRoutes.CONSTRUCTOR} replace />;

  return (
    <div className={styles.wrapper}>
      <p className="text text_type_main-medium">Вход</p>
      <form className={styles.form} onSubmit={handleLogin}>
        <EmailInput
          value={loginData.email}
          onChange={handleSetValue("email")}
        />
        <PasswordInput
          value={loginData.password}
          onChange={handleSetValue("password")}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p
        className={cn(
          styles.message,
          "text",
          "text_type_main-default",
          "text_color_inactive",
        )}
      >
        Вы - новый пользователь?{" "}
        <Link to={PathsRoutes.REGISTER}>Зарегестрироваться</Link>
      </p>
      <p
        className={cn(
          styles.forgetPassword,
          "text",
          "text_type_main-default",
          "text_color_inactive",
        )}
      >
        Забыли пароль?{" "}
        <Link to={PathsRoutes.FORGET_PASSWORD}>Восстановить пароль</Link>
      </p>
    </div>
  );
};
