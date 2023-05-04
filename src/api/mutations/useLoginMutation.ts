import { useMutation } from "@tanstack/react-query";
import request, { IHttpError } from "../utils";
import { AxiosError } from "axios";

export enum EUserRole {
  CLIENT = "client",
  ADMIN = "admin",
}

export interface ILoginResults {
  authToken: string;
  refreshToken: string;
  expiresIn: number; // ms
  role: `${EUserRole}`;
}

export interface ILoginProps {
  email: string;
  password: string;
}

// TODO remove AFTER ADD BACKEND
const mockData: ILoginResults = {
  authToken: 'string',
  refreshToken: 'string',
  expiresIn: 24 * 3600 * 1000, // ms
  role: EUserRole.CLIENT,
}

const mutationFn = async (data: ILoginProps) => {
  // const response = await request().post<ILoginResults>("/auth/login", data);
  // return response.data;
  return mockData;
};

export const useLoginMutation = () => {
  const { data, mutate, isLoading, error } = useMutation<
    ILoginResults,
    AxiosError,
    ILoginProps
  >({
    mutationFn,
  });

  return {
    data,
    isLoading,
    error,
    login: mutate,
  };
};
