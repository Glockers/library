import dayjs from "dayjs";
import { createContext, useEffect, useMemo, useState } from "react";
import { createContainer } from "unstated-next";
import {
  EUserRole,
  ILoginProps,
  ILoginResults,
  useLoginMutation,
} from "../api/mutations";
import { toast } from "react-toastify";

export type IAuthContextResults = ReturnType<typeof useAuthContext>;

enum EStorageKeys {
  TOKEN = "authToken",
  EXPIRES_IN = "expiresIn",
  REFRESH_TOKEN = "refreshToken",
  ROLE = "role",
}

interface IGetTokenResults {
  [EStorageKeys.EXPIRES_IN]?: number;
  [EStorageKeys.REFRESH_TOKEN]?: string;
  [EStorageKeys.TOKEN]?: string;
  [EStorageKeys.ROLE]?: `${EUserRole}`;
}

interface IUserType {
  email: string;
  firstName: string;
  id: string;
  image?: string;
  lastName: string;
  phoneNumber?: string;
  role: EUserRole;
}

interface IAuthState {
  isAuthorized: boolean;
  isLoading: boolean;
  user?: IUserType;
  [EStorageKeys.REFRESH_TOKEN]?: string;
  [EStorageKeys.TOKEN]?: string;
  [EStorageKeys.ROLE]?: `${EUserRole}`;
}

export const getToken = (): IGetTokenResults => {
  return Object.keys(EStorageKeys).reduce<IGetTokenResults>((acc, key) => {
    return {
      ...acc,
      [key]: localStorage.getItem(key) || undefined,
    };
  }, {});
};

const useAuth = () => {
  const { isLoading, error, login } = useLoginMutation();
  const [state, setState] = useState<IAuthState>({
    isAuthorized: false,
    isLoading: false,
  });

  const setLoginData = (data: ILoginResults): void => {
    setState((prev) => ({ ...prev, isLoading: true, ...data }));
    localStorage.setItem(EStorageKeys.EXPIRES_IN, data.expiresIn.toString());
    localStorage.setItem(EStorageKeys.REFRESH_TOKEN, data.refreshToken);
    localStorage.setItem(EStorageKeys.TOKEN, data.authToken);
    localStorage.setItem(EStorageKeys.ROLE, data.role);
    setState((prev) => ({ ...prev, isLoading: false }));
  };

  const logIn = (
    data: ILoginProps,
    config?: Parameters<typeof login>[1]
  ): void => {
    login(data, {
      ...config,
      onSuccess(data, variables, context) {
        setLoginData(data);
        toast("Вы успешно вошли в аккаунт");
        config?.onSuccess && config?.onSuccess(data, variables, context);
      },
    });
  };

  useEffect(() => {
    const data = getToken();
    setState((prev) => ({ ...prev, ...data }));
  }, []);

  return {
    ...state,
    isLoading: state.isLoading || isLoading,
    logIn,
  };
};

const AuthContext = createContainer(useAuth);

const useAuthContext = AuthContext.useContainer;
const AuthContextProvider = AuthContext.Provider;

export { useAuthContext, AuthContextProvider };
