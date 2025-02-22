import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/services";
import styles from "./styles.module.css";
import { IUser } from "@/shared";
import { NavLink, useNavigate } from "react-router-dom";
import cn from "clsx";
import { PathsRoutes } from "@/shared/routes.ts";

import { logout, updateProfile } from "@/services/ducks/user";

export const Profile = () => {
  const tabs = [
    { value: PathsRoutes.PROFILE, title: "Профиль" },
    { value: PathsRoutes.ORDERS, title: "История заказов" },
    { value: "", title: "Выход" },
  ];

  const {
    user: { user },
  } = useAppSelector((state) => ({
    user: state.user,
  }));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [profileData, setProfileData] = useState({
    name: { value: user.name, editable: false },
    email: { value: user.email, editable: false },
    password: { value: "", editable: false },
  });

  const handleSetValue =
    (type: keyof IUser | "password") => (e: ChangeEvent<HTMLInputElement>) => {
      setProfileData({
        ...profileData,
        [type]: { ...profileData[type], value: e.target.value },
      });
    };

  const handleEdit = (type: keyof IUser | "password") => () => {
    setProfileData({
      ...profileData,
      [type]: { ...profileData[type], editable: true },
    });
  };

  const handleLogout = () => {
    dispatch(
      logout({
        onSuccess: () => {
          navigate(PathsRoutes.LOGIN, { replace: true });
        },
      }),
    );
  };

  const handleSaveChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        email: profileData.email.value,
        password: profileData.password.value,
        name: profileData.name.value,
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        {tabs.map(({ value, title }) =>
          value ? (
            <NavLink to={value} key={title}>
              {({ isActive }) => (
                <p
                  className={cn(
                    "text",
                    "text text_type_main-medium",
                    isActive ? "text_color_primary " : "text_color_inactive",
                    styles.tab,
                  )}
                >
                  {title}
                </p>
              )}
            </NavLink>
          ) : (
            <div
              key={title}
              onClick={handleLogout}
              className={cn(
                "text",
                "text text_type_main-medium",
                "text_color_inactive",
                styles.logout,
                styles.tab,
              )}
            >
              {title}
            </div>
          ),
        )}
        <p
          className={cn(
            "text",
            "text text_type_main-small",
            "text_color_inactive",
            styles.info,
          )}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={styles.inputs} onSubmit={handleSaveChanges}>
        <Input
          disabled={!profileData.name.editable}
          placeholder="Имя"
          onChange={handleSetValue("name")}
          value={profileData.name.value}
          icon={"EditIcon"}
          onIconClick={handleEdit("name")}
        />
        <EmailInput
          value={profileData.email.value}
          onChange={handleSetValue("email")}
          isIcon={true}
        />
        <PasswordInput
          value={profileData.password.value}
          name="password"
          onChange={handleSetValue("password")}
          icon="EditIcon"
        />
        <Button
          type="primary"
          size="medium"
          // onClick={handleSaveChanges}
          htmlType="submit"
        >
          Сохранить
        </Button>
      </form>
    </div>
  );
};
