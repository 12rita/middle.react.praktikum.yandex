import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "@/services";

import { Link, Navigate, useNavigate } from "react-router-dom";
import cn from "clsx";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { passwordReset } from "@/services/ducks/password";

import { useToaster } from "@components/Toaster";
import { PathsRoutes } from "@/shared/routes.ts";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    user,
    password: { error },
  } = useAppSelector((state) => ({
    user: state.user,
    password: state.password,
  }));

  const { setError } = useToaster();

  useEffect(() => {
    if (error) setError(error);
  }, [error, setError]);

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleForget = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      passwordReset({
        email,
        onSuccess: () => {
          navigate(PathsRoutes.RESET_PASSWORD, {
            replace: true,
            state: { from: PathsRoutes.FORGET_PASSWORD },
          });
        },
      }),
    );
  };

  if (user.isAuthenticated)
    return <Navigate to={PathsRoutes.CONSTRUCTOR} replace />;

  return (
    <form onSubmit={handleForget} className={styles.wrapper}>
      <p className="text text_type_main-medium">Восстановление пароля</p>

      <EmailInput value={email} onChange={handleSetValue} />

      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        // onClick={handleForget}
      >
        Восстановить
      </Button>
      <p
        className={cn(
          styles.message,
          "text",
          "text_type_main-default",
          "text_color_inactive",
        )}
      >
        Вспомнили пароль? <Link to={PathsRoutes.LOGIN}>Войти</Link>
      </p>
    </form>
  );
};
