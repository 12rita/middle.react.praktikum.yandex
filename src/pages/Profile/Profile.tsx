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

import { updateProfile } from "@/services/ducks/user";

export const Profile = () => {
  const {
    user: { user },
  } = useAppSelector((state) => ({
    user: state.user,
  }));

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
    <div>
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
        <Button type="primary" size="medium" htmlType="submit">
          Сохранить
        </Button>
      </form>
    </div>
  );
};
