import { ReactElement } from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { PageLayout } from "../../layouts";
import { EAppRoutes } from "../../routes/router.config";

import * as S from "./SignUp.styles";
import { z } from "zod";

type TFormFields = z.infer<typeof validation>;

const validation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phoneNumber: z.string().optional(),
});

export const SignUp = (): ReactElement => {
  const [form] = Form.useForm();
  const { formState, control, handleSubmit } = useForm<TFormFields>({
    resolver: zodResolver(validation),
  });

  const handleForm = (data: TFormFields): void => {
    console.log(data);
  };
  return (
    <PageLayout>
      <S.LoginForm
        form={form}
        layout="vertical"
        onSubmitCapture={handleSubmit(handleForm, console.log)}
      >
        <Form.Item
          label="E-mail"
          name="email"
          style={{ marginBottom: 8 }}
          required
          validateStatus={!!formState.errors.email ? "error" : "validating"}
        >
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                type="email"
                placeholder="email@domain.com"
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Имя"
          name="name"
          style={{ marginBottom: 8 }}
          required
          validateStatus={!!formState.errors.firstName ? "error" : "validating"}
        >
          <Controller
            name="firstName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                type="text"
                placeholder="Виктор"
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Фамилия"
          name="lastName"
          style={{ marginBottom: 8 }}
          required
          validateStatus={!!formState.errors.lastName ? "error" : "validating"}
        >
          <Controller
            name="lastName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                type="text"
                placeholder="Краковский"
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          style={{ marginBottom: 4 }}
          required
          validateStatus={!!formState.errors.password ? "error" : "validating"}
        >
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input.Password
                type="password"
                placeholder="********"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Номер телефона"
          name="phoneNumber"
          style={{ marginBottom: 8 }}
          validateStatus={
            !!formState.errors.phoneNumber ? "error" : "validating"
          }
        >
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                type="text"
                placeholder="+375442932345"
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Form.Item>
        <div>
          <S.Text>
            У вас уже есть аккаунта? <Link to={EAppRoutes.LOG_IN}>Войти</Link>
          </S.Text>
        </div>
        <Form.Item>
          <Button
            htmlType="submit"
            style={{ marginTop: "16px" }}
            type="primary"
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
      </S.LoginForm>
    </PageLayout>
  );
};
