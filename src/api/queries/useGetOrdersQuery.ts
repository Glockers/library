import { useQuery } from "@tanstack/react-query";

import avatar from "../../assets/default-avatar.png";
import request from "../utils";
import { ICartResults } from "../mutations";
import { AxiosError } from "axios";
import { books } from "./useGeBooksQuery";

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
}

const queryFn = async (): Promise<IOrderResults> => {
  // const response = await request().get<IOrderResults>("/client/orders");

  // return {
  //   ...response.data,
  // };
  return new Promise((res) => {
    setTimeout(() => {
      res({
        orders: Object.values(EOrderStatus).map((status) => ({
          id: Math.random().toString(),
          items: books.slice(0, 5).map(({ id }) => ({ id, bookId: id })),
          status,
        })),
      });
    }, 2000);
  });
};

export const useGetOrdersQuery = () => {
  const { data, isLoading, error } = useQuery<IOrderResults, AxiosError>({
    queryKey: ["/client/orders"],
    queryFn,
  });

  return { data, isLoading: isLoading, error };
};
