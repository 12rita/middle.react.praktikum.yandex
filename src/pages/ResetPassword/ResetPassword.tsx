import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/services";
import { IPasswordSetData, passwordSet } from "@/services/ducks/password";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "clsx";
import { PathsRoutes } from "@/shared/routes.ts";

import { useToaster } from "@components/Toaster";

export const ResetPassword = () => {
  const [resetData, setResetData] = useState({
    password: "",
    token: "",
  });

  const dispatch = useAppDispatch();
  const { state } = useLocation();
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

  const handleSetValue =
    (type: keyof IPasswordSetData) => (e: ChangeEvent<HTMLInputElement>) => {
      setResetData({ ...resetData, [type]: e.target.value });
    };

  const handleSet = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      passwordSet({
        ...resetData,
        onSuccess: () => {
          navigate(PathsRoutes.LOGIN, { replace: true });
        },
      }),
    );
  };

  if (user.isAuthenticated)
    return <Navigate to={PathsRoutes.CONSTRUCTOR} replace />;

  if (!state || !state.from || state.from !== PathsRoutes.FORGET_PASSWORD)
    return <Navigate to={PathsRoutes.LOGIN} replace />;

  return (
    <form onSubmit={handleSet} className={styles.wrapper}>
      <p className="text text_type_main-medium">Восстановление пароля</p>

      <PasswordInput
        value={resetData.password}
        onChange={handleSetValue("password")}
      />
      <Input
        placeholder="Введите код из письма"
        value={resetData.token}
        onChange={handleSetValue("token")}
      />

      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        // onClick={handleSet}
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
