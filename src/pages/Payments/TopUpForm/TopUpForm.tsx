import { ReactElement } from "react";
import styled from "styled-components";
import { Button, InputNumber } from "antd";

import { useTopUpMonyMutation } from "../../../api/mutations";
import { useAuthContext } from "../../../providers";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";

type TValidationSchema = z.infer<typeof validation>;

const validation = z.object({
  balance: z
    .string()
    .transform((v) => Number(v))
    .refine((v) => !isNaN(v), "Введите число"),
});

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 12px;
`;

export const TopUpForm = (): ReactElement => {
  const { updateState } = useAuthContext();
  const { isLoading, topUp } = useTopUpMonyMutation();
  const { control, handleSubmit, reset } = useForm<TValidationSchema>();

  const submit = (data: TValidationSchema) => {
    if (data.balance) {
      topUp(data, {
        onSuccess() {
          updateState((prev) => ({
            ...prev,
            user: prev.user
              ? {
                  ...prev.user,
                  balance: prev.user?.balance + data.balance,
                }
              : prev.user,
          }));
          // toast.success("Вы пополнили баланс");
          reset({ balance: undefined });
        },
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Controller
        name="balance"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputNumber
            min={0}
            type="number"
            placeholder="0"
            onChange={(balance) => onChange(balance || 0)}
            value={value}
          />
        )}
      />
      <Button htmlType="submit" disabled={isLoading}>
        Пополнить баланс
      </Button>
    </Form>
  );
};
