import { useMutation } from "@tanstack/react-query";
import request, { IHttpError } from "../utils";
import { AxiosError } from "axios";
import { IGetMeResults } from "../queries";
import { EUserRole } from "./useLoginMutation";

export interface IAccountResults extends IGetMeResults {}

export interface IAccountProps {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

// TODO remove AFTER ADD BACKEND
const mockData: IAccountResults = {
  email: "test@email.com",
  firstName: "Name",
  id: "asdasd21323rf43rtg",
  image:
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
  lastName: "LastName",
  phoneNumber: "+375441234567",
  balance: 20.20,
  role: EUserRole.CLIENT,
};

const mutationFnAdd = async (data: IAccountProps) => {
  // const response = await request().post<IAccountResults>('/client/update', data);
  // return response.data;
  return mockData;
};

const mutationFnRemove = async () => {
  // const response = await request().post<IAccountResults>('/client/remove');
  // return response.data;
  return mockData;
};

export const useAccountMutation = () => {
  const { mutate: update, isLoading: isAdding } = useMutation<
    IAccountResults,
    AxiosError,
    IAccountProps
  >({
    mutationKey: ["/client/update"],
    mutationFn: mutationFnAdd,
  });

  const { mutate: remove, isLoading: isRemoving } = useMutation<
    IAccountResults,
    AxiosError,
    undefined
  >({
    mutationKey: ["/client/remove"],
    mutationFn: mutationFnRemove,
  });

  return {
    update,
    remove,
    isLoading: isAdding || isRemoving,
  };
};
