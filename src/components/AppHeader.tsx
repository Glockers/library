import { Header } from "antd/es/layout/layout";
import { ReactElement } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";

import { theme } from "../styles/constants";
import logo from "../assets/pngtree-book.png";
import { EAppRoutes } from "../routes/router.config";

export const HEADER_HEIGHT = 60;

const Container = styled(Header)<{ height: number }>`
  height: ${({ height }) => height};
  background-color: ${theme.colors.primary};
  padding: 0;
`;

const BaseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: ${theme.maxWidth};
  margin: auto;
  padding: 0px 16px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 48px;
`;

const Text = styled.span<{ active: boolean }>`
  font-size: 18px;
  text-transform: uppercase;
  color: #ffffff;
  font-weight: ${({ active }) => (active ? 600 : 400)};
`;

export const AppHeader = (): ReactElement => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Container style={{ height: HEADER_HEIGHT }} height={HEADER_HEIGHT}>
      <BaseWrapper>
        <Wrapper>
          <Link to="/">
            <Logo src={logo} alt="" />
          </Link>
          <Link to="/">
            <Text active={pathname === EAppRoutes.HOME}>Книги</Text>
          </Link>
        </Wrapper>
        <Wrapper>
          {pathname !== EAppRoutes.LOG_IN && (
            <Button type="primary" onClick={() => navigate(EAppRoutes.LOG_IN)}>
              Войти
            </Button>
          )}
        </Wrapper>
      </BaseWrapper>
    </Container>
  );
};
