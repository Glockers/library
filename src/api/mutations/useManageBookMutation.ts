import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IUseGeBooksResults } from "../queries/useGeBooksQuery";

export type IAddBookProps = {
    image: string;
    name: string;
    description: string;
    cost: number;
    author: {
        image: string;
        name: string;
    };
}

export type TDeleteBookProps = {
    id: string;
}

export type TDeleteBookResults = {
    bookid: string;
}




const mutationFnAdd = async (data: IAddBookProps) => {
    // const response = await request().post<IPaymentCardResults>('/payment/card/add', data);
    // return response.data;
    return { ...data, id: Math.random().toString(), author: { ...data.author, id: Math.random().toString() } };
};

const mutationFnRemove = async (data: TDeleteBookProps) => {
    // const response = await request().post<IPaymentCardResults>('/payment/card/remove', data);
    // return response.data;
    return { bookid: data.id };
};


const mutationFnUpdate = async (data: IUseGeBooksResults): Promise<IUseGeBooksResults> => {
    // const response = await request().post<IPaymentCardResults>('/payment/card/remove', data);
    // return response.data;
    return { ...data, };
};


export const useManageBookMutation = () => {
    const client = useQueryClient();

    const { mutate: add, isLoading: isAdding } = useMutation<
        IUseGeBooksResults,
        AxiosError,
        IAddBookProps
    >({
        mutationKey: ["/admin/manage-book/add"],
        mutationFn: mutationFnAdd,
        onSuccess(data) {
            const cachedData = client.getQueriesData<IUseGeBooksResults[]>([
                "/public/books",
            ]);

            cachedData.forEach(([queryKey, results]) => {
                if (!results) return;
                client.setQueriesData(queryKey, () => {
                    return [...results, data];
                });
            });
        },
    });

    const { mutate: remove, isLoading: isRemoving } = useMutation<
        TDeleteBookResults,
        AxiosError,
        TDeleteBookProps
    >({
        mutationKey: ["/admin/manage-book/remove"],
        mutationFn: mutationFnRemove,
        onSuccess(data, variables) {
            const cachedData = client.getQueriesData<IUseGeBooksResults[]>([
                "/public/books",
            ]);

            cachedData.forEach(([queryKey, results]) => {
                if (!results) return;
                client.setQueriesData(queryKey, () => {
                    return results.filter((el) => {
                        return el.id !== variables.id;
                    });
                });
            });
        },
    });


    const { mutate: update, isLoading: isUpdating } = useMutation<
        IUseGeBooksResults,
        AxiosError,
        IUseGeBooksResults
    >({
        mutationKey: ["/admin/manage-book/update"],
        mutationFn: mutationFnUpdate,
        onSuccess(data, variables) {
            const cachedData = client.getQueriesData<IUseGeBooksResults[]>([
                "/public/books",
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
        },
    });


    return { add, remove, update, isAdding, isRemoving, isUpdating };
}