import { ReactElement, useState } from "react";
import { toast } from "react-toastify";
import { useManageBookMutation } from "../../../../api/mutations/useManageBookMutation";
import { IUseGeBooksResults, useGetBooksQuery } from "../../../../api/queries/useGeBooksQuery";
import { AddForm } from "./AddForm";


// type TEntity = IUseGeBooksResults;

export const TableBook = (): ReactElement => {
    // const [dataSource, setDataSource] = useState<TEntity[]>([] as TEntity[]);
    // const [formData, setFormData] = useState<TEntity>({} as TEntity);
    const { add } = useManageBookMutation();
    const { data } = useGetBooksQuery({});

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