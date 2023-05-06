import { ReactElement } from "react";
import styled from "styled-components";
import { Button, Spin } from "antd";
import { toast } from "react-toastify";
import Cards from "react-credit-cards-2";

import { useAuthContext } from "../../../providers";
import { useGetCardsQuery } from "../../../api/queries/useGetCardsQuery";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import { usePaymentCardMutation } from "../../../api/mutations";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  gap: 16px;
  padding: 12px;
`;

export const CreditCards = (): ReactElement => {
  const { isAuthorized } = useAuthContext();
  const { data, isLoading } = useGetCardsQuery({ enabled: isAuthorized });
  const { remove } = usePaymentCardMutation();

  return (
    <Wrapper>
      {isLoading && <Spin />}
      {!data?.items.length && !isLoading && <span>У вас еще нет карт</span>}
      {data?.items.map(({ cvc, expiry, id, name, number }) => (
        <Wrapper
          style={{
            flexDirection: "column",
            width: "fit-content",
            padding: 0,
            alignItems: "center",
          }}
        >
          <Cards
            key={id}
            number={number}
            expiry={expiry}
            cvc={cvc}
            name={name}
          />
          <Button
            danger={true}
            onClick={() =>
              remove(
                { cardId: id },
                {
                  onSuccess() {
                    toast.success("Карта удалена");
                  },
                }
              )
            }
          >
            Удалить
          </Button>
        </Wrapper>
      ))}
    </Wrapper>
  );
};
