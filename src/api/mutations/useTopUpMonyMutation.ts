import { useMutation } from "@tanstack/react-query";
import request, { IHttpError } from "../utils";
import { AxiosError } from "axios";

export interface ITopUpResults {
  balance: number;
}

export interface ITopUpProps {
  balance: number;
}

const mutationFn = async (data: ITopUpProps) => {
  // const response = await request().post<ITopUpResults>("/payment/topup", data);
  // return response.data;
  return { balance: 200 };
};

export const useTopUpMonyMutation = () => {
  const { data, mutate, isLoading, error } = useMutation<
    ITopUpResults,
    AxiosError,
    ITopUpProps
  >({
    mutationFn,
  });

  return {
    data,
    isLoading,
    error,
    topUp: mutate,
  };
};
