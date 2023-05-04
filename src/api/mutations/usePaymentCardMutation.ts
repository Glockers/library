import { useMutation } from "@tanstack/react-query";
import request, { IHttpError } from "../utils";
import { AxiosError } from "axios";
import { faker } from "@faker-js/faker";

export interface IPaymentCardResults {
  id: string;
  number: string;
  expiry: string;
  name: string;
  cvc: number;
}

export interface IPaymentCardProps {
  bookId: string;
}

// TODO remove AFTER ADD BACKEND
const mockData: IPaymentCardResults = {
  number: faker.finance.creditCardNumber(),
  expiry: '27/12',
  name: faker.name.fullName(),
  cvc: parseInt(faker.finance.creditCardCVV()),
  id: 'sad'
};

const mutationFnAdd = async (data: IPaymentCardProps) => {
  // const response = await request().post<IPaymentCardResults>('/payment/card/add', data);
  // return response.data;
  return mockData;
};

const mutationFnRemove = async (data: IPaymentCardProps) => {
  // const response = await request().post<IPaymentCardResults>('/payment/card/remove', data);
  // return response.data;
  return mockData;
};

export const usePaymentCardMutation = () => {
  const { mutate: add, isLoading: isAdding } = useMutation<
    IPaymentCardResults,
    AxiosError,
    IPaymentCardProps
  >({
    mutationKey: ["/payment/card/add"],
    mutationFn: mutationFnAdd,
  });

  const { mutate: remove, isLoading: isRemoving } = useMutation<
    IPaymentCardResults,
    AxiosError,
    IPaymentCardProps
  >({
    mutationKey: ["/payment/card/remove"],
    mutationFn: mutationFnRemove,
  });

  return {
    add,
    remove,
    isLoading: isAdding || isRemoving,
  };
};
