import { useQuery } from "@tanstack/react-query";

import { EUserRole, ICartResults, IPaymentCardResults } from "../mutations";

import avatar from "../../assets/default-avatar.png";
import request from "../utils";
import { AxiosError } from "axios";
import { faker } from "@faker-js/faker";

export interface IGetCardsResults {
  items: Array<IPaymentCardResults>;
}

interface IUseGetCartQueryProps {
  enabled: boolean;
}

const queryFn = async (): Promise<IGetCardsResults> => {
  // const response = await request().get<IGetCardsResults>("/payment/card");

  // return {
  //   ...response.data,
  //   image: response.data.image || avatar,
  //   phoneNumber: "",
  // };
  return new Promise((res) => {
    setTimeout(() => {
      res({ items:[{
        number: '6375 5678 1234 5678',
        expiry: '11/23',
        name: faker.name.fullName(),
        cvc: parseInt(faker.finance.creditCardCVV()),
        id: 'sad'
      }] });
    }, 2000);
  });
};

export const useGetCardsQuery = ({ enabled }: IUseGetCartQueryProps) => {
  const { data, isLoading, error } = useQuery<
    Required<IGetCardsResults>,
    AxiosError
  >({ queryKey: ["/payment/card"], queryFn, enabled });

  return { data, isLoading: isLoading && enabled, error };
};
