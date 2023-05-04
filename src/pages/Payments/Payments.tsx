import { ReactElement, useState } from "react";
import styled from "styled-components";
import { Avatar, Button, Card, Input, Select, Spin } from "antd";
import Cards from "react-credit-cards-2";
import { PageLayout } from "../../layouts";
import {
  ESortType,
  IUseGeBooksResults,
  useGetBooksQuery,
} from "../../api/queries";
import { useNavigate } from "react-router-dom";
import { EAppRoutes } from "../../routes/router.config";
import { useCartMutation, usePaymentCardMutation } from "../../api/mutations";
import { useAuthContext } from "../../providers";
import { useGetCardsQuery } from "../../api/queries/useGetCardsQuery";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const { Meta } = Card;

const Container = styled(PageLayout)``;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 12px;
`;

export const Payments = (): ReactElement => {
  const { isAuthorized } = useAuthContext();
  const { data, isLoading } = useGetCardsQuery({ enabled: isAuthorized });
  const { isLoading: isCardLoading } = usePaymentCardMutation();

  const handleAdd = (bookId: string) => {};
  const handleRemove = (bookId: string) => {};

  return (
    <Container>
      <h1>Ваши карты:</h1>
      <Wrapper>
        {isLoading && <Spin />}
        {data?.items.map(({ cvc, expiry, id, name, number }) => (
          <Cards
            key={id}
            number={number}
            expiry={expiry}
            cvc={cvc}
            name={name}
          />
        ))}
      </Wrapper>
    </Container>
  );
};
