import { ReactElement } from "react";
import { useGetUsersQuery } from "../../../api/queries/useGetUsersQuery";
import { useUsersdMutation } from "../../../api/mutations/useUsersMutation";
import TableFactory from "../../../components/Table/table";
import { columns } from "./config";
import { toast } from "react-toastify";
import { Button, Space } from "antd";
import { CSVLink } from "react-csv";

export const UsersTable = (): ReactElement => {

    const { data } = useGetUsersQuery()
    const { remove, update } = useUsersdMutation();

    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <Button type="primary" >
                    <CSVLink filename={"Пользователи"} data={data ? data : []}>Экспортировать</CSVLink>
                </Button>
            </Space>
            <TableFactory<any>
                columns={columns}
                dataSource={data ? data : []}
                deleteHandler={(data) => remove(data, {
                    onSuccess() {
                        toast.success("Пользователь удален")
                    },
                    onError() {
                        toast.success("Ошибка при удалении")
                    }
                })}
                updateHandler={(data) => {
                    update(data, {
                        onSuccess() {
                            toast.success("Информация о пользователе изменена")
                        },
                        onError() {
                            toast.success("Ошибка при изменении")
                        }
                    })
                }}
            />
        </>
    );
}