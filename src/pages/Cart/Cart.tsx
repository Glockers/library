import { ReactElement, useMemo, useState } from "react";
import styled from "styled-components";
import { Avatar, Button, Card, Input, List, Select, Spin } from "antd";

import { PageLayout } from "../../layouts";
import {
  ESortType,
  IUseGeBooksResults,
  useGetBooksQuery,
} from "../../api/queries";
import { useNavigate } from "react-router-dom";
import { EAppRoutes } from "../../routes/router.config";
import { useCartMutation, usePayMutation } from "../../api/mutations";
import { useAuthContext, useCartContext } from "../../providers";
import { toast } from "react-toastify";

const { Meta } = Card;

const Container = styled(PageLayout)`
  display: block;
  width: 100%;
  min-width: 320px;
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

export const Cart = (): ReactElement => {
  const { user, updateState } = useAuthContext();
  const { hasInCart, removeItem, resetCart, cartItems } = useCartContext();
  const { makePayment } = usePayMutation();
  const { data } = useGetBooksQuery({});

  const items = useMemo(() => {
    return data?.filter((el) => hasInCart(el.id));
  }, [data, cartItems]);

  const amount = useMemo(() => {
    return items?.reduce<number>((sum, el) => sum + el.cost, 0);
  }, [items]);

  const pay = () => {
    if (!amount || !user) return;

    if (amount > user.balance) {
      return toast.error("На балансе недостаточно средст");
    }

    makePayment(
      { items: cartItems },
      {
        onSuccess() {
          toast.success("Оплата успешно произведена");
          resetCart();
          updateState((prev) => ({
            ...prev,
            user: prev.user
              ? { ...prev.user, balance: prev.user.balance - amount }
              : prev.user,
          }));
        },
      }
    );
  };

  return (
    <Container style={{ justifyContent: "start" }}>
      <Wrapper>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={items}
          renderItem={(item) => (
            <List.Item
              extra={<img width={120} alt="" src={item.image} />}
              actions={[
                <Button onClick={() => removeItem(item.id)}>удалить</Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <span>
                    {item.name} {item.cost} BYN
                  </span>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Wrapper>
      {!!items?.length && (
        <BottonButtons>
          <Button type="primary" onClick={pay}>
            Оплатить
          </Button>
          <Amount>Итого: {amount?.toFixed(2)} BYN</Amount>
        </BottonButtons>
      )}
    </Container>
  );
};
