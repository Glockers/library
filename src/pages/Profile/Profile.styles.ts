import { Form, Image, Typography } from "antd";
import styled from "styled-components";

export const LoginForm = styled(Form)`
  max-width: 420px;
  width: 100%;
`;

export const Text = styled(Typography.Text)``;

export const Avatar = styled(Image)`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  margin-bottom: 32px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 100%;
  margin-bottom: 32px;
`;
