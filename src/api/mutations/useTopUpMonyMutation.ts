import { string } from 'zod';
import { useMutation } from "@tanstack/react-query";
import request, { IHttpError } from "../utils";
import { AxiosError } from "axios";
import { IGetMeResults } from "../queries";
import { getFromStorage } from "../queries/storage.config";

export interface IBalanceResults {
  balance: number;
}

export interface ITopUpResults {
  session_id: string;
  url: string;
}

export interface ITopUpProps {
  balance: number;
  user?: IGetMeResults;
}

const mutationFn = async (data: ITopUpProps) => {
  data.user = getFromStorage("my");
  console.log(data)
  const response = await request().post<ITopUpResults>("/api/payment/create-checkout-session", data);
  window.location.href = response.data.url;
  return { balance: data.balance };
};

export const useTopUpMonyMutation = () => {
  const { data, mutate, isLoading, error } = useMutation<
    IBalanceResults,
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
