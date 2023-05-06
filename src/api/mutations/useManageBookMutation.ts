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


const mutationFnAdd = async (data: IAddBookProps) => {
    // const response = await request().post<IPaymentCardResults>('/payment/card/add', data);
    // return response.data;
    return { ...data, id: Math.random().toString(), author: { ...data.author, id: Math.random().toString() } };
};

// const mutationFnRemove = async (data: IPaymentCardProps) => {
//     // const response = await request().post<IPaymentCardResults>('/payment/card/remove', data);
//     // return response.data;
//     return mockData;
// };


// const mutationFnUpdate = async (data: IPaymentCardProps) => {
//     // const response = await request().post<IPaymentCardResults>('/payment/card/remove', data);
//     // return response.data;
//     return mockData;
// };


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

            // if (cachedData) {
            //     // client.setQueriesData(["/public/books"], () => {
            //     //     return {
            //     //         ...cachedData,
            //     //         items: [...cachedData.items, data],
            //     //     };
            //     // });
            // }
            console.log(cachedData)
        },
    });

    return { add, isAdding }
}