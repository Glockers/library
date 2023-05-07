import { useMutation } from "@tanstack/react-query";
import request, { IHttpError } from "../utils";
import { AxiosError } from "axios";

export interface ISignUpResults {
  status: "done";
}

export interface ISignUpProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber?: string | undefined;
}

// TODO remove AFTER ADD BACKEND
const mockData: ISignUpResults = {
  status: "done",
};

const mutationFn = async (data: ISignUpProps) => {
  const response = await request().post<ISignUpResults>("/api/auth/register", data);
  return response.data;
  // return mockData;
};

export const useSignUpMutation = () => {
  const { data, mutate, isLoading, error } = useMutation<
    ISignUpResults,
    AxiosError,
    ISignUpProps
  >({
    mutationFn,
  });

  return {
    data,
    isLoading,
    error,
    signUp: mutate,
  };
};
