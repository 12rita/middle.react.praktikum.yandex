import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { IToasterContext } from "./types";
import { Toaster } from "@components/Toaster/Toaster.tsx";

export const ToasterContext = createContext<IToasterContext>(
  {} as IToasterContext,
);

export const ToasterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      console.log({ error });
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    <ToasterContext.Provider value={{ error, setError }}>
      <Toaster error={error} />
      {children}
    </ToasterContext.Provider>
  );
};
