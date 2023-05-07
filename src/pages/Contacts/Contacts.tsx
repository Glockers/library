import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Avatar, Button, Card, Input, Popover, Select, Spin } from "antd";

import { PageLayout } from "../../layouts";
import {
  ESortType,
  IUseGeBooksResults,
  useGetBooksQuery,
  useGetMapMarkersQuery,
} from "../../api/queries";
import { useNavigate } from "react-router-dom";
import { useAuthContext, useCartContext } from "../../providers";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { EUserRole, useMapMarkersMutation } from "../../api/mutations";

type TLatLang = [number, number];

const { Meta } = Card;

const Container = styled(PageLayout)`
  display: block;
  width: 100%;
  padding: 16px;
`;

const Wrapper = styled.div`
  position: absolute;
  left: 16;
  z-index: 1000;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 12px;
`;

type TStatus = "adding" | "removing";

export const Contacts = (): ReactElement => {
  const [status, setStatus] = useState<TStatus>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const mapRef = useRef<ymaps.Map>();
  const { role } = useAuthContext();
  const defaultState = {
    center: [53.87, 27.573856],
    zoom: 10,
  };
  const { data } = useGetMapMarkersQuery();
  const { add, remove } = useMapMarkersMutation();

  const handleSetStatus = (status: TStatus): void => {
    setStatus((prev) => (prev === status ? undefined : status));
  };

  const handleRemove = (id: string) => {
    remove({ markerId: id });
  };

  const placeMarks = useMemo(
    () =>
      data?.items.map(({ id, latitude, longitude }) => (
        <Placemark
          instanceRef={(inst) =>
            inst?.events?.add("click", () => {
              if (status === "removing") {
                handleRemove(id);
                console.log(id);
              }
            })
          }
          key={id}
          geometry={[latitude, longitude]}
        />
      )),
    [data?.items, status]
  );

  useEffect(() => {
    if (status !== "adding") return;

    const handler = (e: any) => {
      const event = e as ymaps.IEvent<MouseEvent, {}>;
      const [latitude, longitude] = event.get("coords") as TLatLang;
      add({ latitude, longitude });
    };

    mapRef.current?.events.add("click", handler);
    return () => {
      mapRef.current?.events.remove("click", handler);
    };
  }, [mapRef.current?.events, isLoaded, status]);

  return (
    <Container>
      {role === EUserRole.ADMIN && (
        <Wrapper>
          <Popover title="Чтобы добавить маркер кликните по карте в нужном месте">
            <Button
              type={status === "adding" ? "primary" : "default"}
              onClick={() => handleSetStatus("adding")}
            >
              Дабавление маркеров
            </Button>
          </Popover>
          <Popover title="Чтобы удалить маркер кликните по маркеру в нужном месте">
            <Button
              type={status === "removing" ? "primary" : "default"}
              onClick={() => handleSetStatus("removing")}
              danger={true}
            >
              Удаление маркеров
            </Button>
          </Popover>
        </Wrapper>
      )}
      <YMaps>
        <Map
          instanceRef={mapRef}
          width={"100%"}
          height={600}
          onLoad={() => setIsLoaded(true)}
          defaultState={defaultState}
        >
          {placeMarks}
        </Map>
      </YMaps>
    </Container>
  );
};
