/* eslint-disable no-empty-pattern */
import { useQuery } from "@tanstack/react-query";
import { faker } from "@faker-js/faker";

import { EUserRole } from "../mutations";

import avatar from "../../assets/default-avatar.png";
import request from "../utils";
import { AxiosError } from "axios";
import { generatedBooks } from "./books";

export interface IUseGeBooksResults {
  image: string;
  name: string;
  description: string;
  cost: number;
  id: string;
  // address: {
  //   id: string;
  //   addressLine1: string;
  //   city: string;
  // };
  author: {
    id: string;
    // ** Full name */
    name: string;
    image: string;
  };
}

export enum ESortType {
  MONY_HIGHT = "monyHight",
  MONY_LOW = "monyLow",
}

interface IUseGetMeQueryProps {
  search?: string;
  sort?: ESortType;
}

export const books = generatedBooks;

const queryFn = async ({
  search,
  sort,
}: IUseGetMeQueryProps): Promise<IUseGeBooksResults[]> => {
  // const response = await request().get<IUseGeBooksResults[]>("/public/books", {
  //   params: { search },
  // });

  // return response.data;
  return new Promise((res) => {
    setTimeout(() => {
      const items = books.filter(
        ({ name }) => (search && name.includes(search)) || !search
      );
      if (sort) {
        return res(
          items.sort(({ cost }, { cost: cost1 }) =>
            sort === ESortType.MONY_HIGHT ? cost - cost1 : cost1 - cost
          )
        );
      }
      res(items);
    }, 2000);
  });
};

export const useGetBooksQuery = (props: IUseGetMeQueryProps) => {
  const { data, isLoading, error } = useQuery<IUseGeBooksResults[], AxiosError>(
    {
      queryKey: ["/public/books", props],
      queryFn: () => queryFn(props),
      retry: false,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return { data, isLoading: isLoading, error };
};
