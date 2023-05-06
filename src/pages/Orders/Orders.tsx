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
  Typography,
  Timeline,
} from "antd";

import { PageLayout } from "../../layouts";
import {
  EOrderStatus,
  ESortType,
  IUseGeBooksResults,
  useGetBooksQuery,
  useGetOrdersQuery,
} from "../../api/queries";
import { useNavigate } from "react-router-dom";
import { EAppRoutes } from "../../routes/router.config";
import { useCartMutation } from "../../api/mutations";
import { useCartContext } from "../../providers";

const { Title } = Typography;
const Container = styled(PageLayout)`
  display: block;
  width: 100%;
  min-width: 320px;
  padding: 32px;
`;

const colors = {
  [EOrderStatus.COMPLETED]: "#00ff6a",
  [EOrderStatus.IN_PROGRESS]: "#0066ff",
  [EOrderStatus.REJECTED]: "#ff0000",
};
const statuses = {
  [EOrderStatus.COMPLETED]: "завершен",
  [EOrderStatus.IN_PROGRESS]: "в обработке",
  [EOrderStatus.REJECTED]: "отклонен",
};

export const Orders = (): ReactElement => {
  const { data, isLoading: isLoad } = useGetBooksQuery({});
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
      {(isLoading || isLoad) && <Spin size="large" />}
      <Timeline
        style={{ width: "100%" }}
        items={items?.map(({ id, items, status }) => ({
          color: colors[status],
          children: (
            <Card
              title={`№${id.slice(-4)}, сумма: ${getAmount(items)} BYN, cтатус: ${
                statuses[status]
              }`}
              bordered={false}
              style={{ width: "100%" }}
            >
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={items}
                renderItem={(item) => (
                  <List.Item
                    extra={<img width={120} alt="" src={item.image} />}
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
            </Card>
          ),
        }))}
      />
    </Container>
  );
};
