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
import { useCartMutation } from "../../api/mutations";
import { useCartContext } from "../../providers";

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
  const { hasInCart, removeItem, cartItems } = useCartContext();
  const { data } = useGetBooksQuery({});
  const items = useMemo(() => {
    return data?.filter((el) => hasInCart(el.id));
  }, [data, cartItems]);

  const amount = useMemo(() => {
    return items?.reduce<number>((sum, el) => sum + el.cost, 0);
  }, [items]);

  const pay = () => {};

  return (
    <Container>
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
      {items?.length && (
        <BottonButtons>
          <Button type="primary" onClick={pay}>
            Оплатить
          </Button>
          <Amount>Итого: {amount} BYN</Amount>
        </BottonButtons>
      )}
    </Container>
  );
};
