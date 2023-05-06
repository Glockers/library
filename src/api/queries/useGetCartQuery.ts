import { useQuery } from "@tanstack/react-query";

import { EUserRole, ICartResults } from "../mutations";

import avatar from "../../assets/default-avatar.png";
import request from "../utils";
import { AxiosError } from "axios";
import { books } from "./useGeBooksQuery";

export interface IGetCartResults {
  items: Array<ICartResults>;
}

interface IUseGetCartQueryProps {
  enabled: boolean;
}

const queryFn = async (): Promise<IGetCartResults> => {
  // const response = await request().get<IGetCartResults>("/cart");

  // return {
  //   ...response.data,
  //   image: response.data.image || avatar,
  //   phoneNumber: "",
  // };
  return new Promise((res) => {
    setTimeout(() => {
      res({ items: books.slice(0, 5).map(({ id }) => ({ id, bookId: id })) });
    }, 2000);
  });
};

export const useGetCartQuery = ({ enabled }: IUseGetCartQueryProps) => {
  const { data, isLoading, error } = useQuery<
    Required<IGetCartResults>,
    AxiosError
  >({ queryKey: ["/cart"], queryFn, enabled });

  return { data, isLoading: isLoading && enabled, error };
};
