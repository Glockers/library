import { IEditableColumnProps } from "../../../components/Table/table.model";
import { IGetMeResults } from '../../../api/queries';


export const columns: IEditableColumnProps<IGetMeResults>[] = [
  {
    title: "ID пользователя",
    dataIndex: "id",
    sorter: {
      compare: (a, b) => {
        if (a.id && b.id) {
          return a.id.localeCompare(b.id);
        }
        return a.id ? -1 : b.id ? 1 : 0;
      },
    },
  },
  {
    title: "Баланс",
    dataIndex: "email",
    editable: true,
  },
  {
    title: "Название книги",
    dataIndex: "firstName",
    editable: true,
  },
  {
    title: "Описание книги",
    dataIndex: "lastName",
    editable: true,
  },
  {
    title: "Ссылка на картинку",
    dataIndex: "image",
    editable: true,
  },
  {
    title: "Баланс",
    dataIndex: "balance",
    editable: true,
  },
  {
    title: "Роль",
    dataIndex: "role",
    editable: true,
  },
];