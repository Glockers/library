import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IGetMeResults } from './../queries/useGeMeQuery';
import { AxiosError } from 'axios';
import { EUserRole } from './useLoginMutation';
import { IGetUserResults } from '../queries/useGetUsersQuery';
export type TDeleteUserProps = {
    id: string;
}





const _mock: IGetMeResults = {
    balance: 0,
    email: "erwer",
    firstName: "ewrre",
    id: "1",
    lastName: "teseter",
    role: EUserRole.CLIENT,
}


export type TDeleteUserResults = {
    userId: string;
}

const mutationFnRemove = async (data: TDeleteUserProps): Promise<TDeleteUserResults> => {
    // const response = await request().post<IPaymentCardResults>('/payment/card/remove', data);
    // return response.data;
    // return mockData;
    return { userId: data.id };
};

const mutationFnUpdate = async (data: IGetMeResults): Promise<IGetMeResults> => {
    // const response = await request().post<IPaymentCardResults>('/payment/card/remove', data);
    // return response.data;
    return { ...data };
}


export const useUsersdMutation = () => {

    const client = useQueryClient();

    const { mutate: remove, isLoading: isRemoving } = useMutation<
        TDeleteUserResults,
        AxiosError,
        TDeleteUserProps
    >({
        mutationKey: ["/admin/manage-user/delete"],
        mutationFn: mutationFnRemove,
        onSuccess(data, variables) {
            const cachedData = client.getQueriesData<IGetMeResults[]>([
                "/client/clients",
            ]);

            cachedData.forEach(([queryKey, results]) => {
                if (!results) return;
                client.setQueriesData(queryKey, () => {
                    return results.filter((el) => {
                        return el.id !== variables.id;
                    });
                });
            });
        }

    })

    const { mutate: update, isLoading: isUpdating } = useMutation<
        IGetMeResults,
        AxiosError,
        IGetMeResults
    >({
        mutationKey: ["/admin/manage-user/update"],
        mutationFn: mutationFnUpdate,
        onSuccess(data, variables) {
            const cachedData = client.getQueriesData<IGetMeResults[]>([
                "/client/clients",
            ]);

            cachedData.forEach(([queryKey, results]) => {
                if (!results) return;
                const updatingArray = [...results];
                const index: number = updatingArray.findIndex((item) => variables.id === item.id)
                const item: any = updatingArray[index];
                updatingArray.splice(index, 1, {
                    ...item,
                    ...variables
                });

                client.setQueriesData(queryKey, () => {
                    return updatingArray;
                })
            });
        }

    })


    return { remove, update, isUpdating, isRemoving }
}