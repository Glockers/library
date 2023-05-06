import { IUseGeBooksResults } from "../../../../api/queries";
import { IEditableColumnProps } from "../../../../components/Table/table.model";


// const compareString = <T extends any>(a: T, b: T, key: keyof T) => {


// }

export const columns: IEditableColumnProps<IUseGeBooksResults>[] = [
    {
        title: 'Номер книги',
        dataIndex: "id",
        sorter: {
            compare: (a, b) => {
                if (a.id && b.id) {
                    return a.id.localeCompare(b.id);
                }
                return a.id ? -1 : b.id ? 1 : 0;
            }
        }
    },
    {
        title: 'Название книги',
        dataIndex: "name",
        editable: true,
        sorter: {
            compare: (a, b) => {
                if (a.name && b.name) {
                    return a.name.localeCompare(b.name);
                }
                return a.name ? -1 : b.name ? 1 : 0;
            }
        }
    },
    {
        title: 'Описание книги',
        dataIndex: "description",
        editable: true,
        sorter: {
            compare: (a, b) => {
                if (a.description && b.description) {
                    return a.description.localeCompare(b.description);
                }
                return a.description ? -1 : b.description ? 1 : 0;
            }
        }
    },
    {
        title: 'Cтоимость книги',
        dataIndex: "cost",
        editable: true,
    },
    {
        title: 'Ссылка на картинку',
        dataIndex: "image",
        editable: true,
    },
    {
        title: 'Имя автора',
        dataIndex: ["author", "image"],
        editable: true,
    },
];