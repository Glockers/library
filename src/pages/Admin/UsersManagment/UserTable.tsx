import { ReactElement } from "react";
import { useGetUsersQuery } from "../../../api/queries/useGetUsersQuery";

export const UsersTable = (): ReactElement => {

    const { data } = useGetUsersQuery()

    console.log(data)
    return (
        <>

        </>
    );
}