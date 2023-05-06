import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { IHttpError } from "../utils";
import { AxiosError } from "axios";
import { ICartProps } from "./useCartMutation";
import { EOrderStatus, IOrder, IOrderResults } from "../queries";

export interface IPayResults extends IOrder {}

export interface IPayProps {
  items: ICartProps[];
}

// TODO remove AFTER ADD BACKEND
const mutationFn = async (data: IPayProps): Promise<IPayResults> => {
  // const response = await request().post<IPayResults>("/client/cart/pay", data);
  // return response.data;
  return {
    id: Math.random().toString(),
    items: data.items.map(({ bookId }) => ({ bookId, id: bookId })),
    status: EOrderStatus.IN_PROGRESS,
  };
};

export const usePayMutation = () => {
  const client = useQueryClient();
  const { data, mutate, isLoading, error } = useMutation<
    IPayResults,
    AxiosError,
    IPayProps
  >({
    mutationFn,
    onSuccess(data) {
      const cachedData = client.getQueryData<IOrderResults>(["/client/orders"]);

      if (cachedData) {
        client.setQueryData(["/client/orders"], () => {
          return {
            ...cachedData,
            orders: [data, ...cachedData.orders],
          };
        });
      }
    },
  });

  return {
    data,
    isLoading,
    error,
    makePayment: mutate,
  };
};
