import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EUserRole } from "../mutations";
import { IGetMeResults } from "./useGeMeQuery";

export interface IGetUserResults {
    users: Array<IGetMeResults>
}


const _mock: IGetMeResults[] = [
    {
        email: "test@email.com",
        firstName: "Name",
        id: "asdasd21323rf43rtg",
        image:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
        lastName: "LastName",
        phoneNumber: "+375441234567",
        balance: 2022.20,
        role: EUserRole.ADMIN,
    },
    {
        email: "Tester@email.com",
        firstName: "Tester",
        id: "werewrer",
        image:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
        lastName: "LastName2",
        phoneNumber: "+375441234567",
        balance: 1000.20,
        role: EUserRole.CLIENT,
    },
    {
        email: "test@email.com",
        firstName: "Alibaba",
        id: "werer",
        image:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
        lastName: "LastName3",
        phoneNumber: "+375441234567",
        balance: 111.20,
        role: EUserRole.CLIENT,
    },
]

const queryFn = async (): Promise<IGetUserResults> => {

    const data = _mock;


    return new Promise((res) => {
        setTimeout(() => {
            res({ users: data });
        }, 2000);
    });
}

export const useGetUsersQuery = () => {

    const { data, isLoading, error } = useQuery<IGetUserResults, AxiosError>({
        queryKey: ["/client/clients"],
        queryFn,
        retry: false,
        retryOnMount: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    return { data, isLoading, error }
}



