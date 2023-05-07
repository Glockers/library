import { ReactElement } from 'react'
import { UsersTable } from './UserTable';

export const Users = (): ReactElement => {


    return (
        <>
            <h1>Управление пользователями</h1>
            <UsersTable />
        </>
    );
}