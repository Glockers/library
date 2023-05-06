import { ReactElement, useMemo } from "react";
import styled from "styled-components";
import { Tabs } from "antd";

import { PageLayout } from "../../layouts";

import { CreditCards } from "./Cards";
import { AddCardForm } from "./AddCardForm";
import { TopUpForm } from "./TopUpForm";

const Container = styled(PageLayout)`
  padding: 16px;
  align-items: start;
  justify-content: start;
`;

export const Payments = (): ReactElement => {
  const items = useMemo(
    () => [
      {
        key: "1",
        label: `Ваши карты`,
        children: <CreditCards />,
      },
      {
        key: "2",
        label: `Добавить карту`,
        children: <AddCardForm />,
      },
      {
        key: "3",
        label: `Пополнить счет`,
        children: <TopUpForm />,
      },
    ],
    []
  );

  return (
    <Container>
      <Tabs defaultActiveKey="1" items={items} />
    </Container>
  );
};
