import { ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Avatar, Button, Card, Input, Select, Spin } from "antd";

import { PageLayout } from "../../layouts";
import {
  ESortType,
  IUseGeBooksResults,
  useGetBooksQuery,
  useGetMapMarkersQuery,
} from "../../api/queries";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../providers";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const { Meta } = Card;

const Container = styled(PageLayout)`
  display: block;
  width: 100%;
  padding: 16px;
  height: fit-content;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 12px;
`;

export const Contacts = (): ReactElement => {
  const mapRef = useRef<ymaps.Map>();
  const defaultState = {
    center: [53.87, 27.573856],
    zoom: 10,
  };
  const { data, isLoading } = useGetMapMarkersQuery();

  const handleAdd = (bookId: string) => {};
  const handleRemove = (bookId: string) => {};

  useEffect(() => {
    mapRef.current?.events.add("click", (e) => {
      console.log(e.get("coords"));
    });
  }, [mapRef.current]);

  return (
    <Container>
      <YMaps>
        <Map
          instanceRef={mapRef}
          width={"100%"}
          height={600}
          defaultState={defaultState}
        >
          {data?.items.map(({ id, latitude, longitude }) => (
            <Placemark key={id} geometry={[latitude, longitude]} />
          ))}
        </Map>
      </YMaps>
    </Container>
  );
};
