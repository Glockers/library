import { ReactElement, useMemo } from "react";
import styled from "styled-components";
import { Card, Spin, Typography, Row, Col, Statistic } from "antd";
import dayjs from "dayjs";
import { Bar, Line } from "react-chartjs-2";
import { ArrowUpOutlined } from "@ant-design/icons";

import { PageLayout } from "../../../layouts";
import { useGetBooksQuery, useGetOrdersQuery } from "../../../api/queries";

const { Title } = Typography;
const Container = styled(PageLayout)`
  width: 100%;
  padding: 32px;
  justify-content: start;
`;

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 1020px;
  margin-bottom: 16px;
`;

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Ежедневные продажи",
    },
  },
};

export const AdminReports = (): ReactElement => {
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

  const chartData = useMemo(() => {
    const data: Record<string, number> = {};

    items?.forEach((item) => {
      const key = dayjs(item.createdAt).format("DD-MM-YYYY");
      const value = data[key];

      if (value) {
        data[key] = value + getAmount(item.items);
        return;
      }
      data[key] = getAmount(item.items);
    });

    return Object.entries(data)
      .map(([x, y]) => ({ x, y }))
      .sort(
        (a, b) => dayjs(a.x).toDate().getTime() - dayjs(b.x).toDate().getTime()
      );
  }, [items]);

  const chartBooksData = useMemo(() => {
    const data: Record<string, number> = {};

    items?.forEach((item) => {
      item.items.forEach((book) => {
        const key = book.name;
        const value = data[key];

        if (value) {
          data[key] = value + 1;
          return;
        }
        data[key] = 1;
      });
    });

    return Object.entries(data)
      .map(([y, x]) => ({ x, y }))
      .sort((a, b) => b.x - a.x);
  }, [items]);

  const totalAmount = useMemo(
    () => chartData.reduce((sum, curr) => sum + curr.y, 0),
    [chartData]
  );

  const totalBooks = useMemo(
    () => chartBooksData.reduce((sum, curr) => sum + curr.x, 0),
    [chartBooksData]
  );

  if (isLoading || isLoad) {
    return (
      <Container>
        <Spin size="large" />
      </Container>
    );
  }

  return (
    <Container>
      <ChartWrapper>
        <Title>Ежедневный заработок</Title>
        <Line
          options={{
            ...options,
            scales: {
              y: {
                ticks: {
                  callback(tickValue, index, ticks) {
                    return tickValue + " BYN";
                  },
                },
              },
            },
          }}
          data={{
            datasets: [
              {
                data: chartData,
                label: "Сумма",
                borderColor: "#3496d8",
                backgroundColor: "#70b9e9",
              },
            ],
          }}
        />
      </ChartWrapper>
      <ChartWrapper>
        <Title>Популярность книг</Title>
        <Bar
          options={{
            ...options,
            indexAxis: "y" as const,
          }}
          data={{
            datasets: [
              {
                data: chartBooksData,
                label: "Купили раз",
                borderColor: "#3496d8",
                backgroundColor: "#70b9e9",
              },
            ],
          }}
        />
      </ChartWrapper>
      <Row gutter={16} style={{ width: "100%" }}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Всего заработано"
              value={totalAmount}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="BYN"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Продано книг"
              value={totalBooks}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="кол."
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
