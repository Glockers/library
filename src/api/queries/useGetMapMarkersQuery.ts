import { useQuery } from "@tanstack/react-query";

import avatar from "../../assets/default-avatar.png";
import request from "../utils";
import { AxiosError } from "axios";
import { addToStorage, getFromStorage } from "./storage.config";
import { useEffect } from "react";

export interface IGetMapMarkersResults {
  items: Array<IMapMarkers>;
}

export interface IMapMarkers {
  id: string;
  latitude: number;
  longitude: number;
}

const queryFn = async (): Promise<IGetMapMarkersResults> => {
  // const response = await request().get<IGetMapMarkersResults>("/map");

  // return {
  //   ...response.data,
  // };
  const data = getFromStorage<IGetMapMarkersResults>("map");

  if (!data) {
    const items = {
      items: [
        {
          latitude: 53.875161158318676,
          longitude: 27.609256390624985,
          id: "asdsadasd",
        },
      ],
    };
    addToStorage("map", items);
    return new Promise((res) => {
      setTimeout(() => {
        res(items);
      }, 2000);
    });
  }
  return new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, 2000);
  });
};

export const useGetMapMarkersQuery = () => {
  const { data, isLoading, error } = useQuery<
    IGetMapMarkersResults,
    AxiosError
  >({
    queryKey: ["/map"],
    queryFn,
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      addToStorage("map", data);
    }
  }, [data]);

  return { data, isLoading: isLoading, error };
};
