import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { IHttpError } from "../utils";
import { AxiosError } from "axios";
import { ICartProps } from "./useCartMutation";
import { EOrderStatus, IOrder, IOrderResults, books } from "../queries";

export interface IChangeOrderResults extends IOrder {}

export interface IChangeOrderProps {
  orderId: string;
  status: EOrderStatus;
}

// TODO remove AFTER ADD BACKEND
const mutationFn = async (
  data: IChangeOrderProps
): Promise<IChangeOrderResults> => {
  // const response = await request().post<IChangeOrderResults>("/admin/orders/status", data);
  // return response.data;
  return {
    id: Math.random().toString(),
    items: books.slice(0, 5).map(({ id }) => ({ bookId: id, id })),
    status: EOrderStatus.IN_PROGRESS,
    createdAt: new Date(),
  };
};

export const useChangeOrderMutation = () => {
  const client = useQueryClient();
  const { data, mutate, isLoading, error } = useMutation<
    IChangeOrderResults,
    AxiosError,
    IChangeOrderProps
  >({
    mutationFn,
    onSuccess(data, variables) {
      const cachedData = client.getQueryData<IOrderResults>(["/client/orders"]);

      if (cachedData) {
        client.setQueryData(["/client/orders"], () => {
          return {
            ...cachedData,
            orders: cachedData.orders.map((prev) =>
              prev.id === variables.orderId
                ? { ...prev, status: variables.status }
                : prev
            ),
          };
        });
      }
    },
  });

  return {
    data,
    isLoading,
    error,
    changeStatus: mutate,
  };
};
