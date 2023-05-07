import { useQuery } from "@tanstack/react-query";

import { EUserRole } from "../mutations";

import avatar from "../../assets/default-avatar.png";
import request from "../utils";
import { AxiosError } from "axios";
import { addToStorage, getFromStorage } from "./storage.config";

export interface IGetMeResults {
  email: string;
  firstName: string;
  balance: number;
  id: string;
  image?: string;
  lastName: string;
  phoneNumber?: string;
  role: EUserRole;
}

interface IUseGetMeQueryProps {
  enabled: boolean;
}

// export const user = {
//   email: "test@email.com",
//   firstName: "Name",
//   id: "asdasd21323rf43rtg",
//   image:
//     "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
//   lastName: "LastName",
//   phoneNumber: "+375441234567",
//   balance: 2022.20,
//   role: EUserRole.ADMIN,
// }

const queryFn = async (): Promise<Required<IGetMeResults>> => {
  const user: IGetMeResults = getFromStorage("my") as IGetMeResults

  const response = await request().get<IGetMeResults>(`/api/user/me/${user.id}`);
  addToStorage("my", response.data)
  console.log("response: ", response.data)
  // console.log(localStorage.getItem("role"))
  // return {
  //   ...response.data,
  //   image: response.data.image || avatar,
  //   phoneNumber: "",
  // };
  return {
    ...response.data,
    phoneNumber: response.data?.phoneNumber ? response.data.phoneNumber : "",
    image: response.data.image || avatar,
  }
};

export const useGetMeQuery = ({ enabled }: IUseGetMeQueryProps) => {
  const { data, isLoading, error } = useQuery<Required<IGetMeResults>, AxiosError>({ queryKey: ["me"], queryFn, enabled });
  return { data, isLoading: isLoading && enabled, error };
};
