import React, { createContext, useState } from "react";

export type User = {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
};

type TypeAuth = {
  accessToken: String | null | undefined;
  user: User | null | undefined;
};

type TypeAuthContext = {
  auth: TypeAuth | undefined;
  setAuth: React.Dispatch<React.SetStateAction<TypeAuth>>;
};

const AuthContext = createContext<TypeAuthContext>({
  auth: { accessToken: null, user: null },
  setAuth: () => undefined,
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = (props) => {
  const [auth, setAuth] = useState<TypeAuth>({ accessToken: null, user: null });
  return <AuthContext.Provider value={{ auth, setAuth }}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
