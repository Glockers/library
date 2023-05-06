import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { faker } from "@faker-js/faker";

import request, { IHttpError } from "../utils";
import { IGetCardsResults } from "../queries/useGetCardsQuery";

export interface IPaymentCardResults {
  id: string;
  number: string;
  expiry: string;
  name: string;
  cvc: string;
}

export interface IPaymentCardProps {
  cardId: string;
}

export interface IAddPaymentCardProps {
  number: string;
  expiry: string;
  name: string;
  cvc: string;
}

// TODO remove AFTER ADD BACKEND
const mockData: IPaymentCardResults = {
  number: faker.finance.creditCardNumber(),
  expiry: "27/12",
  name: faker.name.fullName(),
  cvc: faker.finance.creditCardCVV(),
  id: "sad",
};

const mutationFnAdd = async (data: IAddPaymentCardProps) => {
  // const response = await request().post<IPaymentCardResults>('/payment/card/add', data);
  // return response.data;
  return {...data, id: Math.random().toString()};
};

const mutationFnRemove = async (data: IPaymentCardProps) => {
  // const response = await request().post<IPaymentCardResults>('/payment/card/remove', data);
  // return response.data;
  return mockData;
};

export const usePaymentCardMutation = () => {
  const client = useQueryClient();
  const { mutate: add, isLoading: isAdding } = useMutation<
    IPaymentCardResults,
    AxiosError,
    IAddPaymentCardProps
  >({
    mutationKey: ["/payment/card/add"],
    mutationFn: mutationFnAdd,
    onSuccess(data) {
      const cachedData = client.getQueryData<IGetCardsResults>([
        "/payment/card",
      ]);

      if (cachedData) {
        client.setQueryData(["/payment/card"], () => {
          return {
            ...cachedData,
            items: [...cachedData.items, data],
          };
        });
      }
    },
  });

  const { mutate: remove, isLoading: isRemoving } = useMutation<
    IPaymentCardResults,
    AxiosError,
    IPaymentCardProps
  >({
    mutationKey: ["/payment/card/remove"],
    mutationFn: mutationFnRemove,
    onSuccess(data, variables) {
      const cachedData = client.getQueryData<IGetCardsResults>([
        "/payment/card",
      ]);

      if (cachedData) {
        client.setQueryData(["/payment/card"], () => {
          return {
            ...cachedData,
            items: cachedData?.items.filter((el) => el.id !== variables.cardId),
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
