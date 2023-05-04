import { ReactElement, useState } from "react";
import styled from "styled-components";
import { Avatar, Button, Card, Input, Select, Spin } from "antd";

import { PageLayout } from "../../layouts";
import {
  ESortType,
  IUseGeBooksResults,
  useGetBooksQuery,
} from "../../api/queries";
import { useNavigate } from "react-router-dom";
import { EAppRoutes } from "../../routes/router.config";
import { useCartMutation } from "../../api/mutations";
import { useCartContext } from "../../providers";

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
  padding: 12px;
`;

const BookCard = ({
  book,
  isSelected,
  onAdd,
  onRemove,
}: {
  book: IUseGeBooksResults;
  isSelected?: boolean;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}): ReactElement => {
  const nav = useNavigate();

  return (
    <Card
      style={{ width: 300, paddingBottom: 36 }}
      cover={<img alt="example" src={book.image} />}
    >
      <Meta
        style={{ marginBottom: 16 }}
        avatar={<Avatar src={book.author.image} />}
        title={book.author.name}
      />
      <Meta style={{ marginBottom: 16 }} title={`${book.cost} BYN`} />
      <Meta title={book.name} description={book.description} />
      <div style={{ position: "absolute", bottom: 8, display: "flex", gap: 8 }}>
        {!isSelected && (
          <Button onClick={() => onAdd(book.id)} type="primary">
            Добавить
          </Button>
        )}
        {isSelected && (
          <>
            <Button onClick={() => nav(EAppRoutes.CART)} type="primary">
              Перейти в корзину
            </Button>
            <Button onClick={() => onRemove(book.id)} type="dashed">
              Удалить
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export const Home = (): ReactElement => {
  const [search, setSearch] = useState<string>();
  const [sort, setSort] = useState<ESortType>();
  const { data, isLoading } = useGetBooksQuery({ search, sort });
  const {
    addItem,
    removeItem,
    hasInCart,
    isLoading: isCartLoading,
  } = useCartContext();
  // const handleSearchChange = useCallback(
  //   () => debounce((search: string) => setSearch(search), 500),
  //   []
  // );
  const handleAdd = (bookId: string) => {};
  const handleRemove = (bookId: string) => {};

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
        <Select
          defaultValue=""
          style={{ width: 180 }}
          onChange={(e) => setSort(e ? (e as ESortType) : undefined)}
          options={[
            { value: "", label: "не выбрано" },
            { value: ESortType.MONY_HIGHT, label: "BYN по возрастанию" },
            { value: ESortType.MONY_LOW, label: "BYN по убыванию" },
          ]}
        />
      </Wrapper>
      <Wrapper>
        {data?.map((book) => (
          <BookCard
            book={book}
            isSelected={hasInCart(book.id)}
            onAdd={addItem}
            onRemove={removeItem}
          />
        ))}
        {isLoading && <Spin size="large" />}
      </Wrapper>
    </Container>
  );
};
