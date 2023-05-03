import { ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Input, Spin } from "antd";

import { PageLayout } from "../../layouts";
import { IUseGeBooksResults, useGetBooksQuery } from "../../api/queries";

const { Meta } = Card;

const Container = styled(PageLayout)`
  width: 100%;
  display: grid;
  min-width: 320px;
  grid-template-rows: 72px 1fr;
  grid-template-columns: 1fr;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

const BookCard = ({ book }: { book: IUseGeBooksResults }): ReactElement => {
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt="example" src={book.image} />}
    >
      <Meta
        style={{ marginBottom: 16 }}
        avatar={<Avatar src={book.author.image} />}
        title={book.author.name}
      />
      <Meta title={book.name} description={book.description} />
    </Card>
  );
};
export const Home = (): ReactElement => {
  const [search, setSearch] = useState<string>();
  const { data, isLoading } = useGetBooksQuery({ search });
  // const handleSearchChange = useCallback(
  //   () => debounce((search: string) => setSearch(search), 500),
  //   []
  // );

  return (
    <Container style={{ display: "grid" }}>
      <Wrapper>
        <Input.Search
          style={{ width: "100%", maxWidth: "420px" }}
          placeholder="Поиск"
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
          value={search}
        />
      </Wrapper>
      <Wrapper>
        {data?.map((book) => (
          <BookCard book={book} />
        ))}
        {isLoading && <Spin size="large" />}
      </Wrapper>
    </Container>
  );
};
