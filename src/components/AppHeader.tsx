import { Header } from "antd/es/layout/layout";
import { ReactElement } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Image, Skeleton } from "antd";

import { theme } from "../styles/constants";
import { EAppRoutes } from "../routes/router.config";
import { useAuthContext } from "../providers";

export const HEADER_HEIGHT = 60;

const Container = styled(Header) <{ height: number }>`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ height }) => height};
  background-color: ${theme.colors.primary};
  padding: 0;
  z-index: 10;
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

const Avatar = styled.img`
  object-fit: cover;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  margin-right: 16px;
  background: #ffffff;
  cursor: pointer;
`;

const Text = styled.span<{ active: boolean }>`
  font-size: 18px;
  text-transform: uppercase;
  color: #ffffff;
  font-weight: ${({ active }) => (active ? 600 : 400)};
`;

const Name = styled.span`
  font-size: 14px;
  color: #ffffff;
  margin-right: 8px;
`;

const Mony = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin-right: 16px;
`;

export const AppHeader = (): ReactElement => {
  const { isAuthorized, user, logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <Container style={{ height: HEADER_HEIGHT }} height={HEADER_HEIGHT}>
      <BaseWrapper>
        <Wrapper>
          <Text active>Book shelf company</Text>
        </Wrapper>
        <Wrapper>
          {!isAuthorized && (
            <Button type="primary" onClick={() => navigate(EAppRoutes.LOG_IN)}>
              Войти
            </Button>
          )}

          {isAuthorized && (
            <>
              <Mony>{user?.balance} BYN</Mony>
              <Name>{user?.firstName}</Name>
              <Avatar
                src={user?.image}
                alt=""
                onClick={() => navigate(EAppRoutes.PROFILE)}
              />
              <Button
                type="dashed"
                onClick={() => {
                  logout();
                  navigate(EAppRoutes.HOME);
                }}
              >
                Выйти
              </Button>
            </>
          )}
        </Wrapper>
      </BaseWrapper>
    </Container>
  );
};
