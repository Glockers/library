import { useQuery } from "@tanstack/react-query";

import avatar from "../../assets/default-avatar.png";
import request from "../utils";
import { AxiosError } from "axios";

export interface IMapMarkersResults {
  items: Array<IMapMarkers>;
}

export interface IMapMarkers {
  id: string;
  latitude: number;
  longitude: number;
}

const queryFn = async (): Promise<IMapMarkersResults> => {
  // const response = await request().get<IMapMarkersResults>("/map");

  // return {
  //   ...response.data,
  // };
  return new Promise((res) => {
    setTimeout(() => {
      res({ items: [{ latitude: 53.875161158318676, longitude: 27.609256390624985, id: "asdsadasd" }] });
    }, 2000);
  });
};

export const useGetMapMarkersQuery = () => {
  const { data, isLoading, error } = useQuery<
    IMapMarkersResults,
    AxiosError
  >({ queryKey: ["/map"], queryFn });

  return { data, isLoading: isLoading, error };
};
