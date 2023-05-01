import { Layout } from "antd";
import { ComponentProps, ReactElement } from "react";
import styled from "styled-components";

import { HEADER_HEIGHT } from "../components";

type TProps = ComponentProps<typeof Layout>;

const Container = styled(Layout)<{ headerheight: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - ${({ headerheight }) => `${headerheight}px`});
  overflow-x: hidden;
  background-color: transparent;
`;

export const PageLayout = ({ children, ...props }: TProps): ReactElement => {
  return (
    <Container {...props} headerheight={HEADER_HEIGHT}>
      {children}
    </Container>
  );
};
