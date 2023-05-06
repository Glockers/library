import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Popconfirm, Space, Table, TableProps } from 'antd';
import { IEditableCellProps, IPropsTableCRUD } from './table.model';


const EditableCell: React.FC<IEditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Пожалуйста введите "${title}"!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


const TableFactory = <T extends { id: string }>(props: IPropsTableCRUD<T>) => {
    const [form] = Form.useForm();
    const [element, setElement] = useState<T>({} as T);
    const [editingKey, setEditingKey] = useState<any>('');
    const isEditing = (record: T) => record.id === editingKey;
    const [loading, setLoading] = useState<boolean>(false)

    const handleDelete = async (key: string) => {
        try {
            setLoading(true);
            const newData: T[] = props.dataSource.filter((item: T) => item.id !== key);
            const element = props.dataSource.find((item: T) => item.id === key);
            if (element) {
                props.setDataSource(newData);
                await props.deleteHandler(element);
            }
        } catch (errInfo) {
            console.error('Validate Failed:', errInfo);
        } finally {
            setLoading(false);
        }
    };


    const cancel = () => {
        setEditingKey('Произошла ошибка');
        setEditingKey('');
    };

    useEffect(() => console.log(element), [element])

    const edit = (record: T) => {
        setLoading(true)
        form.setFieldsValue({
            // name: '', age: '', address: '',
            ...record
        });
        setEditingKey(record.id);
        setLoading(false)
    };

    const save = async (key: string) => {
        try {
            setLoading(true)
            const row: T = (await form.validateFields()) as T;
            const newData: T[] = [...props.dataSource];
            const index: number = newData.findIndex((item) => key === item.id);
            if (index > -1) {
                const item: any = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                setElement(row);
            } else {
                newData.push(row);
            }
            setEditingKey('');
            props.setDataSource(newData);
            props.updateHandler(newData[index])
        } catch (errInfo) {
            console.error('Validate Failed:', errInfo);
        } finally {
            setLoading(false)
        }
    };


    const defaultColumns = [
        ...props.columns,
        {
            title: 'Операции',
            dataIndex: 'operation',
            render: (_: any, record: T) => {
                const editable = isEditing(record);
                return (
                    <>
                        <Space>
                            {editable ? (
                                <>
                                    <Popconfirm title="Изменить данные?" onConfirm={() => save(record.id)}>
                                        <Button>Сохранить</Button>
                                    </Popconfirm>
                                    <Button onClick={cancel}>Отмена</Button>
                                </>
                            ) : (
                                <>
                                    <Popconfirm title="Удалить запись?"
                                        onConfirm={() => handleDelete(record.id)}>
                                        <Button>Удалить</Button>
                                    </Popconfirm>

                                    <Button disabled={editingKey !== ''} onClick={() => edit(record)}>Изменить</Button>

                                </>
                            )
                            }
                        </Space>
                    </>
                )
            },
        },
    ];


    const components = {
        body: {
            cell: EditableCell,
        },
    }

    const mergedColumns = defaultColumns.map((col: any) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: T) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const onChange: TableProps<T>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };


    return (
        <>

            <Form form={form} component={false}>
                <Table
                    bordered
                    dataSource={props.dataSource}
                    columns={mergedColumns}
                    components={components}
                    loading={loading}
                    onChange={onChange}
                    rowKey={record => record.id.toString()}
                />
            </Form>
        </>
    );
};

export default TableFactory;