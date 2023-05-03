import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import {
  EUserRole,
  ILoginProps,
  ILoginResults,
  useLoginMutation,
} from "../api/mutations";
import { toast } from "react-toastify";
import { useGetMeQuery } from "../api/queries";

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
  return Object.values(EStorageKeys).reduce<IGetTokenResults>((acc, key) => {
    return {
      ...acc,
      [key]: localStorage.getItem(key) || undefined,
    };
  }, {});
};

const useAuth = () => {
  const [state, setState] = useState<IAuthState>({
    isAuthorized: false,
    isLoading: false,
  });
  const { isLoading, login } = useLoginMutation();
  const {
    data,
    isLoading: isMeLoading,
    error,
  } = useGetMeQuery({ enabled: state.isAuthorized });

  const setLoginData = (data: ILoginResults): void => {
    setState((prev) => ({ ...prev, isLoading: true, ...data }));
    localStorage.setItem(EStorageKeys.EXPIRES_IN, data.expiresIn.toString());
    localStorage.setItem(EStorageKeys.REFRESH_TOKEN, data.refreshToken);
    localStorage.setItem(EStorageKeys.TOKEN, data.authToken);
    localStorage.setItem(EStorageKeys.ROLE, data.role);
    setState((prev) => ({ ...prev, isLoading: false, isAuthorized: true }));
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

  const logout = (): void => {
    setState((prev) => ({ ...prev, isLoading: true }));
    localStorage.removeItem(EStorageKeys.EXPIRES_IN);
    localStorage.removeItem(EStorageKeys.REFRESH_TOKEN);
    localStorage.removeItem(EStorageKeys.TOKEN);
    localStorage.removeItem(EStorageKeys.ROLE);
    setState(() => ({ isAuthorized: false, isLoading: false }));
  };

  useEffect(() => {
    console.log(data);
    if (data) {
      setState((prev) => ({
        ...prev,
        isAuthorized: true,
        isLoading: false,
        role: data.role,
        user: data,
      }));
    }
  }, [data]);

  useEffect(() => {
    if (error?.status === 401) {
      logout();
    }
  }, [error]);

  useEffect(() => {
    const data = getToken();
    if (data.authToken) {
      setState((prev) => ({ ...prev, ...data, isAuthorized: true }));
    }
  }, []);

  return {
    ...state,
    isLoading: state.isLoading || isLoading || isMeLoading,
    logIn,
    logout,
  };
};

const AuthContext = createContainer(useAuth);

const useAuthContext = AuthContext.useContainer;
const AuthContextProvider = AuthContext.Provider;

export { useAuthContext, AuthContextProvider };
