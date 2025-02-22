import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./styles.module.css";

import { Link, Navigate } from "react-router-dom";
import cn from "clsx";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/services";
import { IRegisterData, register } from "@/services/ducks/user";
import { PathsRoutes } from "@/shared/routes.ts";

export const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { user } = useAppSelector((state) => ({
    user: state.user,
  }));

  const dispatch = useAppDispatch();

  const handleSetValue =
    (type: keyof IRegisterData) => (e: ChangeEvent<HTMLInputElement>) => {
      setRegisterData({ ...registerData, [type]: e.target.value });
    };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register({ ...registerData }));
  };

  if (user.isAuthenticated)
    return <Navigate to={PathsRoutes.CONSTRUCTOR} replace />;

  return (
    <form onSubmit={handleRegister} className={styles.wrapper}>
      <p className="text text_type_main-medium">Регистрация</p>
      <Input
        placeholder="Имя"
        value={registerData.name}
        onChange={handleSetValue("name")}
      />
      <EmailInput
        value={registerData.email}
        onChange={handleSetValue("email")}
      />
      <PasswordInput
        value={registerData.password}
        onChange={handleSetValue("password")}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        // onClick={handleRegister}
      >
        Зарегистрироваться
      </Button>
      <p
        className={cn(
          styles.message,
          "text",
          "text_type_main-default",
          "text_color_inactive",
        )}
      >
        Уже зарегистрированы? <Link to={PathsRoutes.LOGIN}>Войти</Link>
      </p>
    </form>
  );
};
