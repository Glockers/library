import { useMutation } from "@tanstack/react-query";
import request, { IHttpError } from "../utils";
import { AxiosError } from "axios";
import { addToStorage } from "../queries/storage.config";
import { IGetMeResults } from "../queries";

export enum EUserRole {
  CLIENT = "client",
  ADMIN = "admin",
}

export interface ILoginResults {
  authToken: string;
  refreshToken: string;
  expiresIn: number; // ms
  user: IGetMeResults;
}

export interface ILoginProps {
  email: string;
  password: string;
}

// TODO remove AFTER ADD BACKEND
// const mockData: ILoginResults = {
//   authToken: 'string',
//   refreshToken: 'string',
//   expiresIn: 24 * 3600 * 1000, // ms
// }

const mutationFn = async (data: ILoginProps) => {
  const response = await request().post<ILoginResults>("/api/auth/login", data);
  addToStorage("my", response.data.user);
  return response.data;
  // return mockData;
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
