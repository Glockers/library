import { Button, Result, Typography } from "antd";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { PageLayout } from "../layouts";

const { Text } = Typography;

type TErrorCodes = 404 | 500 | 403;

interface IErrorTemplateProps {
  description?: string;
  buttonText?: string;
  errorCode: TErrorCodes;
  title: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled(Text)`
  font-size: 64px;
`;

export const ErrorTemplate = ({
  errorCode,
  title,
  description,
  buttonText,
}: IErrorTemplateProps): ReactElement => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <Result
        status={errorCode}
        title={title}
        subTitle={description}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            {buttonText || "На главную"}
          </Button>
        }
      />
    </PageLayout>
  );
};
