import { Controller, useForm } from "react-hook-form";
import { number, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, InputNumber } from "antd";
import { IAddBookProps } from "../../../../api/mutations/useManageBookMutation";




type TFormFields = z.infer<typeof validation>;

// const addressValidation = z.object({
//     addressLine1: z.string(),
//     city: z.string()
// })

const authorValidation = z.object({
    name: z.string(),
    image: z.string()
})

const validation = z.object({
    image: z.string(),
    name: z.string(),
    description: z.string(),
    cost: z.number().min(1),
    // address: addressValidation,
    author: authorValidation
});

interface IProps {
    onAdd: (data: IAddBookProps) => void
}

export const AddForm = ({ onAdd }: IProps) => {

    const { handleSubmit, control, formState } = useForm<TFormFields>({
        resolver: zodResolver(validation),
    });

    return (
        <Form onSubmitCapture={handleSubmit(onAdd)}>
            <Form.Item
                label="Название книги"
                name="name"
                style={{ marginBottom: 8 }}
                required
            >
                <Controller
                    name="name"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            type="name"
                            placeholder="Три товарища"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item
                label="Описание книги"
                name="description"
                style={{ marginBottom: 8 }}
                required
            >
                <Controller
                    name="description"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            type="description"
                            placeholder="Три товарища - это замечательная книга."
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item
                label="Цена"
                name="cost"
                style={{ marginBottom: 8 }}
                required
            >
                <Controller
                    name="cost"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <InputNumber
                            type="cost"
                            placeholder="100"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item
                label="Cсылка на картинку"
                name="image"
                style={{ marginBottom: 8 }}
                required
            >
                <Controller
                    name="image"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            type="text"
                            placeholder="https://s2-goods.ozstatic.by/2000/513/245/10/10245513_0.jpg"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item
                label="Фамилия автора"
                name="author.name"
                style={{ marginBottom: 8 }}
                required
            >
                <Controller
                    name="author.name"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            type="author.name"
                            placeholder="Ремарк"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item
                label="Ссылка на картинку автора"
                name="author.image"
                style={{ marginBottom: 8 }}
                required
            >
                <Controller
                    name="author.image"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            type="text"
                            placeholder="https://s2-goods.ozstatic.by/2000/513/245/10/10245513_0.jpg"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
            </Form.Item>

            <Button htmlType="submit">Добавить</Button>
        </Form>
    )
}