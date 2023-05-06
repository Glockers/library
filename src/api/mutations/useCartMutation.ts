import { useMutation } from "@tanstack/react-query";
import request, { IHttpError } from "../utils";
import { AxiosError } from "axios";

export interface ICartResults {
  id: string;
  bookId: string;
}

export interface ICartProps {
  bookId: string;
}

// TODO remove AFTER ADD BACKEND
const mockData: ICartResults = {
  bookId: "done",
  id: 'sad'
};

const mutationFnAdd = async (data: ICartProps) => {
  // const response = await request().post<ICartResults>('client/cart/item/add', data);
  // return response.data;
  return mockData;
};

const mutationFnRemove = async (data: ICartProps) => {
  // const response = await request().post<ICartResults>('client/cart/item/remove', data);
  // return response.data;
  return mockData;
};

export const useCartMutation = () => {
  const { mutate: add, isLoading: isAdding } = useMutation<
    ICartResults,
    AxiosError,
    ICartProps
  >({
    mutationKey: ["client/cart/item/add"],
    mutationFn: mutationFnAdd,
  });

  const { mutate: remove, isLoading: isRemoving } = useMutation<
    ICartResults,
    AxiosError,
    ICartProps
  >({
    mutationKey: ["client/cart/item/remove"],
    mutationFn: mutationFnRemove,
  });

  return {
    add,
    remove,
    isLoading: isAdding || isRemoving,
  };
};
