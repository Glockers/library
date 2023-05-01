import { ReactElement } from "react";
import { Button, Form, Input, Spin } from "antd";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { PageLayout } from "../../layouts";
import { EAppRoutes } from "../../routes/router.config";

import * as S from "./Login.styles";
import { z } from "zod";
import { useAuthContext } from "../../providers";

type TFormFields = z.infer<typeof validation>;

const validation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const Login = (): ReactElement => {
  const { logIn, isLoading } = useAuthContext();
  const [form] = Form.useForm();
  const { formState, control, setError, handleSubmit } = useForm<TFormFields>({
    resolver: zodResolver(validation),
  });

  const handleForm = (data: TFormFields): void => {
    logIn(data, {
      onError() {
        setError("root", { message: "Неправильный E-mail или пароль" });
      },
    });
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
          label="Пароль"
          name="password"
          style={{ marginBottom: 4 }}
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
        {(!!formState.errors.password || !!formState.errors.root) && (
          <S.Text type="danger">Неправильный E-mail или пароль</S.Text>
        )}
        <div>
          <S.Text>
            У вас еще нет аккаунта?{" "}
            <Link to={EAppRoutes.SIGN_UP}>Зарегистрироваться</Link>
          </S.Text>
        </div>
        <Form.Item>
          <Button
            htmlType="submit"
            disabled={isLoading}
            style={{ marginTop: "16px" }}
            type="primary"
          >
            Войти {isLoading && <Spin style={{ marginLeft: 4 }} size="small" />}
          </Button>
        </Form.Item>
      </S.LoginForm>
    </PageLayout>
  );
};
