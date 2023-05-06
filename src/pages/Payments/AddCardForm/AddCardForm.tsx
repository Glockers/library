import { ReactElement, useState } from "react";
import styled from "styled-components";
import { Button, Form, Input } from "antd";
import Cards from "react-credit-cards-2";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-credit-cards-2/dist/es/styles-compiled.css";

import { usePaymentCardMutation } from "../../../api/mutations";

type TValidationSchema = z.infer<typeof validation>;

const validation = z.object({
  number: z.string().min(16),
  expiry: z.string().min(4),
  name: z.string().min(4),
  cvc: z.string().length(3),
});

const AppForm = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 12px;
`;

const Wrapper = styled.div`
  height: 100%;
  min-width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 16px;
  padding: 12px;
`;

export const AddCardForm = (): ReactElement => {
  const [form] = Form.useForm();
  const [focused, setFocused] = useState(false);
  const { add } = usePaymentCardMutation();
  const { control, formState, handleSubmit, watch } =
    useForm<TValidationSchema>({
      resolver: zodResolver(validation),
    });
  const { number, cvc, expiry, name } = watch();

  const handleAdd = (data: TValidationSchema) => {
    add(data, {
      onSuccess() {
        toast.success("карта добавлена");
      },
    });
  };

  return (
    <AppForm>
      <Cards
        number={number || ""}
        expiry={expiry || ""}
        cvc={cvc || ""}
        name={name || ""}
        focused={focused ? "cvc" : undefined}
      />
      <Form
        form={form}
        layout="vertical"
        onSubmitCapture={handleSubmit(handleAdd)}
      >
        <Wrapper>
          <Form.Item
            label="Номер карты"
            name="number"
            style={{ marginBottom: 2, width: '100%' }}
            validateStatus={!!formState.errors.number ? "error" : "validating"}
          >
            <Controller
              name="number"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                width={'100%'}
                  placeholder="0000 0000 0000 0000"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Дата"
            name="expiry"
            style={{ marginBottom: 2, width: '100%' }}
            validateStatus={!!formState.errors.expiry ? "error" : "validating"}
          >
            <Controller
              name="expiry"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input placeholder="12/24" onChange={onChange} value={value} />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Держатель карты"
            name="name"
            style={{ marginBottom: 2, width: '100%' }}
            validateStatus={!!formState.errors.name ? "error" : "validating"}
          >
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Ivan Ivanov"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="CVC"
            name="cvc"
            style={{ marginBottom: 2, width: '100%' }}
            validateStatus={!!formState.errors.cvc ? "error" : "validating"}
          >
            <Controller
              name="cvc"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="123"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Form.Item>
          <Button htmlType="submit">Добавить</Button>
        </Wrapper>
      </Form>
    </AppForm>
  );
};
