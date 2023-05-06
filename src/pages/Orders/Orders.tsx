import { ReactElement, useMemo, useState } from "react";
import styled from "styled-components";
import {
  Avatar,
  Button,
  Card,
  Input,
  List,
  Select,
  Spin,
  Timeline,
} from "antd";

import { PageLayout } from "../../layouts";
import {
  ESortType,
  IUseGeBooksResults,
  useGetBooksQuery,
  useGetOrdersQuery,
} from "../../api/queries";
import { useNavigate } from "react-router-dom";
import { EAppRoutes } from "../../routes/router.config";
import { useCartMutation } from "../../api/mutations";
import { useCartContext } from "../../providers";

const { Meta } = Card;

const Container = styled(PageLayout)`
  display: block;
  width: 100%;
  min-width: 320px;
  padding: 32px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 32px;
`;

const BottonButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 32px;
`;

const Amount = styled.p`
  font-weight: 600;
  margin: 0;
`;

export const Orders = (): ReactElement => {
  const { hasInCart, removeItem, cartItems } = useCartContext();
  const { data } = useGetBooksQuery({});
  const { data: orders, isLoading } = useGetOrdersQuery();
  const items = useMemo(() => {
    return (
      data &&
      orders?.orders.map(({ items, ...props }) => ({
        ...props,
        items: data.filter((el) => items.find((item) => el.id === item.bookId)),
      }))
    );
  }, [data, orders?.orders]);

  const getAmount = (data: NonNullable<typeof items>[0]["items"]): number => {
    return data.reduce((acc, num) => acc + num.cost, 0);
  };

  return (
    <Container>
      <Timeline
        items={items?.map(() => ({
          children: (
            <Card title="Card title" bordered={false} style={{ width: 300 }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          ),
        }))}
      />
    </Container>
  );
};
