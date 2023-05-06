import { ReactElement, useState } from "react";
import { toast } from "react-toastify";
import { useManageBookMutation } from "../../../../api/mutations/useManageBookMutation";
import { IUseGeBooksResults } from "../../../../api/queries/useGeBooksQuery";
import TableFactory from "../../../../components/Table/table";
import { IPropsTableCRUD } from "../../../../components/Table/table.model";
import { AddForm } from "./add-form";
import { columns } from "./config";

type TEntity = IUseGeBooksResults;

export const TableBook = (): ReactElement => {
    const [dataSource, setDataSource] = useState<TEntity[]>([] as TEntity[]);
    const [formData, setFormData] = useState<TEntity>({} as TEntity);
    const { add } = useManageBookMutation();





    return (
        <>
            <AddForm onAdd={(data) => add(data, {
                onSuccess() {
                    toast.success("Книга добавлена")
                }
            })} />
            {/* <TableFactory<TEntity>
                columns={columns}
                deleteHandler={deleteHandler}
                updateHandler={updateHandler}
                dataSource={dataSource}
                saveHandler={saveHandler}
                setDataSource={setDataSource}
            /> */}
        </>
    )
}