import { NoticeType } from "antd/es/message/interface";
import { ColumnProps } from "antd/es/table";

export interface IEditableColumnProps<T> extends ColumnProps<T> {
    editable?: boolean;
}


export interface ITableProps<T> {
    dataSource: T[],
    setDataSource?: (data: T[]) => void,
    columns: IEditableColumnProps<T>[]
    showMessage?: (text: string, type: NoticeType) => void
}

export interface IEditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: any;
    index: number;
    children: React.ReactNode;
}


export interface ICRUDOperation<T> {
    saveHandler: (data: T) => void;
    updateHandler: (newData: T) => void;
    deleteHandler: (data: T) => void;
}

export interface IPropsTableCRUD<T> extends ITableProps<T>, ICRUDOperation<T> { }
