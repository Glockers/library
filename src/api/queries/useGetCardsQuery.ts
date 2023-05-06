import { useQuery } from "@tanstack/react-query";

import { EUserRole, ICartResults, IPaymentCardResults } from "../mutations";

import avatar from "../../assets/default-avatar.png";
import request from "../utils";
import { AxiosError } from "axios";
import { faker } from "@faker-js/faker";
import { addToStorage, getFromStorage } from "./storage.config";
import { useEffect } from "react";

export interface IGetCardsResults {
  items: Array<IPaymentCardResults>;
}

interface IUseGetCartQueryProps {
  enabled: boolean;
}

const items = [
  {
    number: "6375 5678 1234 5678",
    expiry: "11/23",
    name: faker.name.fullName(),
    cvc: faker.finance.creditCardCVV(),
    id: Math.random().toString(),
  },
  {
    number: "6365 5347 1234 5678",
    expiry: "11/23",
    name: faker.name.fullName(),
    cvc: faker.finance.creditCardCVV(),
    id: Math.random().toString(),
  },
  {
    number: "1234 5678 1234 5678",
    expiry: "11/23",
    name: faker.name.fullName(),
    cvc: faker.finance.creditCardCVV(),
    id: Math.random().toString(),
  },
];

const queryFn = async (): Promise<IGetCardsResults> => {
  // const response = await request().get<IGetCardsResults>("/payment/card");

  // return {
  //   ...response.data,
  //   image: response.data.image || avatar,
  //   phoneNumber: "",
  // };
  const data = getFromStorage<IGetCardsResults>("cards");

  if (!data) {
    addToStorage("cards", { items });
    return new Promise((res) => {
      setTimeout(() => {
        res({ items });
      }, 2000);
    });
  }
  return new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, 2000);
  });
};

export const useGetCardsQuery = ({ enabled }: IUseGetCartQueryProps) => {
  const { data, isLoading, error } = useQuery<
    Required<IGetCardsResults>,
    AxiosError
  >({
    queryKey: ["/payment/card"],
    queryFn,
    enabled,
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      addToStorage("cards", data);
    }
  }, [data]);

  return { data, isLoading: isLoading && enabled, error };
};
