/* eslint-disable no-empty-pattern */
import { useQuery } from "@tanstack/react-query";
import { faker } from "@faker-js/faker";

import { EUserRole } from "../mutations";

import avatar from "../../assets/default-avatar.png";
import request from "../utils";
import { AxiosError } from "axios";

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

export const books = Array.from({ length: 40 }, () => ({
  name: faker.music.songName(),
  address: {
    id: Math.random().toString(),
    addressLine1: "г. Минск, ул. Темерязева 101а",
    city: "Минск",
  },
  cost: parseFloat(faker.finance.amount(5, 60)),
  author: {
    id: Math.random().toString(),
    name: faker.name.fullName(),
    image: faker.image.avatar(),
  },
  description: faker.commerce.productDescription(),
  id: Math.random().toString(),
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwjPHSBopmW0fcsPtI_8TjPH_GNiljnOINSg&usqp=CAU",
}));

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
    }
  );

  return { data, isLoading: isLoading, error };
};
