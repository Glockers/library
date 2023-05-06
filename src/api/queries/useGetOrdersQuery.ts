import { useQuery } from "@tanstack/react-query";

import avatar from "../../assets/default-avatar.png";
import request from "../utils";
import { ICartResults } from "../mutations";
import { AxiosError } from "axios";
import { books } from "./useGeBooksQuery";
import { useEffect } from "react";
import { addToStorage, getFromStorage } from "./storage.config";

export enum EOrderStatus {
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  REJECTED = "rejected",
}

export interface IOrderResults {
  orders: Array<IOrder>;
}

export interface IOrder {
  id: string;
  items: ICartResults[];
  status: EOrderStatus;
  createdAt: Date | string;
}

const results = {
  orders: Object.values(EOrderStatus).map((status) => ({
    id: Math.random().toString(),
    items: books.slice(0, 5).map(({ id }) => ({ id, bookId: id })),
    status,
    createdAt: new Date(),
  })),
};

const queryFn = async (): Promise<IOrderResults> => {
  // const response = await request().get<IOrderResults>("/client/orders");

  // return {
  //   ...response.data,
  // };
  const data = getFromStorage<IOrderResults>("orders");

  if (!data) {
    addToStorage("orders", results);
    return new Promise((res) => {
      setTimeout(() => {
        res(results);
      }, 2000);
    });
  }
  return new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, 2000);
  });
};

export const useGetOrdersQuery = () => {
  const { data, isLoading, error } = useQuery<IOrderResults, AxiosError>({
    queryKey: ["/client/orders"],
    queryFn,
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      addToStorage("orders", data);
    }
  }, [data]);

  return { data, isLoading: isLoading, error };
};
