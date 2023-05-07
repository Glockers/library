import { ReactElement, useState } from "react";
import { toast } from "react-toastify";
import { useManageBookMutation } from "../../../../api/mutations/useManageBookMutation";
import { IUseGeBooksResults, useGetBooksQuery } from "../../../../api/queries/useGeBooksQuery";
import TableFactory from "../../../../components/Table/table";
import { AddForm } from "./AddForm";
import { columns } from "./config";
import { Button, Space, Spin } from "antd";
import { CSVLink } from "react-csv";


// type TEntity = IUseGeBooksResults;

export const TableBook = (): ReactElement => {
    // const [dataSource, setDataSource] = useState<TEntity[]>([] as TEntity[]);
    // const [formData, setFormData] = useState<TEntity>({} as TEntity);
    const { add, remove, update } = useManageBookMutation();
    const { data, isLoading } = useGetBooksQuery({});
    return (
        <>
            <AddForm onAdd={(data) => add(data, {
                onSuccess() {
                    toast.success("Книга добавлена")
                }
            })} />

            <Space style={{ marginBottom: 16 }}>
                <Button type="primary" >
                    <CSVLink filename={"Книги"} data={data ? data : []}>Экспортировать</CSVLink>
                </Button>
            </Space>

            <TableFactory<any>
                columns={columns}
                deleteHandler={(data) => remove(data, {
                    onSuccess() {
                        toast.success("Книга Удалена")
                    }
                })}
                updateHandler={update}
                dataSource={data ? data : []}
                saveHandler={add}
            // setDataSource={setDataSource}
            />
        </>
    )
}