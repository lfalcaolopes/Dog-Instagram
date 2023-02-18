import { createContext, useState } from "react";

interface dadosUserType {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
}

interface context {
  dadosUser: dadosUserType | undefined;
  setDadosUser: React.Dispatch<React.SetStateAction<dadosUserType | undefined>>;
}

export const GlobalContext = createContext<context | undefined>(undefined);

export const GlobalStorageProvider = ({ children }: { children: JSX.Element }) => {
  const [dadosUser, setDadosUser] = useState<dadosUserType>();

  return <GlobalContext.Provider value={{ dadosUser, setDadosUser }}>{children}</GlobalContext.Provider>;
};
