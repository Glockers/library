import { useQuery } from "@tanstack/react-query";

import { EUserRole, ICartResults } from "../mutations";

import avatar from "../../assets/default-avatar.png";
import request from "../utils";
import { AxiosError } from "axios";
import { books } from "./useGeBooksQuery";
import { addToStorage, getFromStorage } from "./storage.config";
import { useEffect } from "react";

export interface IGetCartResults {
  items: Array<ICartResults>;
}

interface IUseGetCartQueryProps {
  enabled: boolean;
}

const queryFn = async (): Promise<IGetCartResults> => {
  // const response = await request().get<IGetCartResults>("/client/cart");

  // return {
  //   ...response.data,
  //   image: response.data.image || avatar,
  //   phoneNumber: "",
  // };
  const data = getFromStorage<IGetCartResults>("myCart");
  if (!data) {
    const results = {
      items: books.slice(0, 5).map(({ id }) => ({ id, bookId: id })),
    };
    addToStorage("myCart", {
      items: books.slice(0, 5).map(({ id }) => ({ id, bookId: id })),
    });
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

export const useGetCartQuery = ({ enabled }: IUseGetCartQueryProps) => {
  const { data, isLoading, error } = useQuery<
    Required<IGetCartResults>,
    AxiosError
  >({
    queryKey: ["/client/cart"],
    queryFn,
    enabled,
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      addToStorage("myCart", data);
    }
  }, [data]);

  return { data, isLoading: isLoading && enabled, error };
};
