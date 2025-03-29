import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { IToasterContext } from "./types";
import { Toaster } from "@components/Toaster/Toaster.tsx";

export const ToasterContext = createContext<IToasterContext>(
  {} as IToasterContext,
);

export const ToasterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (errors.length) {
      setTimeout(() => {
        setErrors((prev) => {
          const newState = [...prev];
          newState.shift();
          return newState;
        });
      }, 3000);
    }
  }, [errors.length]);

  const handleSetError = (error: string) => {
    setErrors([...errors, error]);
  };

  return (
    <ToasterContext.Provider value={{ setError: handleSetError }}>
      <Toaster errors={errors} />
      {children}
    </ToasterContext.Provider>
  );
};
