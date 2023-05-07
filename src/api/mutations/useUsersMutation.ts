import { IGetMeResults } from './../queries/useGeMeQuery';
export type TDeleteUserProps = {
    id: string;
}

// const mutationFnUpdate = async (data: IGetMeResults): IGetMeResults => {

//     return null;
// }

const mutationFnRemove = async (data: TDeleteUserProps) => {
    // const response = await request().post<IPaymentCardResults>('/payment/card/remove', data);
    // return response.data;
    // return mockData;
};

export const useUsersdMutation = () => {



}