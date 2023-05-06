import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { IHttpError } from "../utils";
import { AxiosError } from "axios";
import { IGetCartResults } from "../queries";

export interface ICartResults {
  id: string;
  bookId: string;
}

export interface ICartProps {
  bookId: string;
}

const mutationFnAdd = async (data: ICartProps) => {
  // const response = await request().post<ICartResults>('client/cart/item/add', data);
  // return response.data;
  return { ...data, id: data.bookId };
};

const mutationFnRemove = async (data: ICartProps) => {
  // const response = await request().post<ICartResults>('client/cart/item/remove', data);
  // return response.data;
  return { ...data, id: data.bookId };
};

export const useCartMutation = () => {
  const client = useQueryClient();
  const { mutate: add, isLoading: isAdding } = useMutation<
    ICartResults,
    AxiosError,
    ICartProps
  >({
    mutationKey: ["client/cart/item/add"],
    mutationFn: mutationFnAdd,
    onSuccess(data) {
      const cachedData = client.getQueryData<IGetCartResults>(["/client/cart"]);

      if (cachedData) {
        client.setQueryData(["/client/cart"], () => {
          return {
            ...cachedData,
            items: [data, ...cachedData.items],
          };
        });
      }
    },
  });

  const { mutate: remove, isLoading: isRemoving } = useMutation<
    ICartResults,
    AxiosError,
    ICartProps
  >({
    mutationKey: ["client/cart/item/remove"],
    mutationFn: mutationFnRemove,
    onSuccess(data) {
      const cachedData = client.getQueryData<IGetCartResults>(["/client/cart"]);

      if (cachedData) {
        client.setQueryData(["/client/cart"], () => {
          return {
            ...cachedData,
            items: cachedData.items.filter(
              (item) => item.bookId !== data.bookId
            ),
          };
        });
      }
    },
  });

  return {
    add,
    remove,
    isLoading: isAdding || isRemoving,
  };
};
