import { ReactElement, useMemo, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  PieChartOutlined,
  UserOutlined,
  FileMarkdownFilled,
  ShopFilled,
  OrderedListOutlined,
  MoneyCollectFilled,
  AlertTwoTone,
  DeliveredProcedureOutlined,
  BankFilled,
  UserSwitchOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";

import { EAppRoutes } from "../routes/router.config";
import { useAuthContext } from "../providers";
import logo from "../assets/pngtree-book.png";
import { EUserRole } from "../api/mutations";

type MenuItem = Required<MenuProps>["items"][number] & {
  permisson?: `${EUserRole}`[];
};

const { Header, Sider } = Layout;

const Container = styled(Header)`
  height: 100vh;
  padding: 0;
`;

const Logo = styled.img`
  height: 48px;
`;

// getItem('Option 1', '1', <PieChartOutlined />, () => navigate('/')),
// getItem('Option 2', '2', <DesktopOutlined />),
// getItem('User', 'sub1', <UserOutlined />, [
//   getItem('Tom', '3'),
//   getItem('Bill', '4'),
//   getItem('Alex', '5'),
// ]),
// getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
// getItem('Files', '9', <FileOutlined />),

const withCondition = <T extends any[]>(condition: boolean, results: T) =>
  condition ? results : [];

export const AppBar = (): ReactElement => {
  const { isAuthorized, role } = useAuthContext();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  // console.log(role)
  const items = useMemo<MenuItem[]>(
    () => [
      {
        key: EAppRoutes.HOME,
        icon: <PieChartOutlined />,
        label: "Каталог",
        onClick: () => navigate(EAppRoutes.HOME),
      },
      {
        key: EAppRoutes.MAP,
        icon: <FileMarkdownFilled />,
        label: "Пункты выдачи",
        onClick: () => navigate(EAppRoutes.MAP),
      },
      {
        key: EAppRoutes.CART,
        icon: <ShopFilled />,
        label: "Корзина",
        onClick: () => navigate(EAppRoutes.CART),
      },
      ...withCondition(isAuthorized, [
        {
          key: EAppRoutes.ORDERS,
          icon: <OrderedListOutlined />,
          label: "Заказы",
          onClick: () => navigate(EAppRoutes.ORDERS),
        },
        {
          key: EAppRoutes.PROFILE,
          icon: <UserOutlined />,
          label: "Профиль",
          onClick: () => navigate(EAppRoutes.PROFILE),
        },
        {
          key: EAppRoutes.PAYMENTS,
          icon: <MoneyCollectFilled />,
          label: "Оплата",
          onClick: () => navigate(EAppRoutes.PAYMENTS),
        },
      ]),
      ...withCondition(role === EUserRole.ADMIN, [
        {
          key: EAppRoutes.MANAGMENT_BOOK,
          icon: <AlertTwoTone />,
          label: "Управ. книгами",
          onClick: () => navigate(EAppRoutes.MANAGMENT_BOOK),
        },
        {
          key: EAppRoutes.ADMIN_ORDERS,
          icon: <DeliveredProcedureOutlined />,
          label: "Управ. заказами",
          onClick: () => navigate(EAppRoutes.ADMIN_ORDERS),
        },
        {
          key: EAppRoutes.ADMIN_REPORTS,
          icon: <BankFilled />,
          label: "Отчеты",
          onClick: () => navigate(EAppRoutes.ADMIN_REPORTS),
        },
        {
          key: EAppRoutes.MANAGMENT_USERS,
          icon: <UserSwitchOutlined />,
          label: "Пользователи",
          onClick: () => navigate(EAppRoutes.MANAGMENT_USERS),
        },
      ]),
    ],
    [isAuthorized, navigate, role]
  );

  return (
    <Container>
      <Sider
        collapsible
        collapsed={collapsed}
        theme="dark"
        onCollapse={(value) => setCollapsed(value)}
      >
        <div>
          <Link to="/">
            <Logo src={logo} alt="" />
          </Link>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
    </Container>
  );
};
