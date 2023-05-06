import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { IHttpError } from "../utils";
import { AxiosError } from "axios";
import { IGetMapMarkersResults } from "../queries";

export interface IAddMapMarkersResults {
  id: string;
  latitude: number;
  longitude: number;
}

export interface IRemoveMapMarkersResults {
  id: string;
}

export interface IMapMarkersProps {
  markerId: string;
}

export interface IMapMarkersAddProps {
  latitude: number;
  longitude: number;
}

export interface IMapMarkersUpdateProps {
  markerId: string;
  latitude: number;
  longitude: number;
}

const mutationFnAdd = async (data: IMapMarkersAddProps) => {
  // const response = await request().post<IMapMarkersResults>('/map/marker/add', data);
  // return response.data;
  return { ...data, id: Math.random().toString() };
};

const mutationFnRemove = async (data: IMapMarkersProps) => {
  // const response = await request().post<IMapMarkersResults>('/map/marker/remove', data);
  // return response.data;
  return { id: data.markerId };
};

export const useMapMarkersMutation = () => {
  const client = useQueryClient();
  const { mutate: add, isLoading: isAdding } = useMutation<
    IAddMapMarkersResults,
    AxiosError,
    IMapMarkersAddProps
  >({
    mutationKey: ["/map/marker/add"],
    mutationFn: mutationFnAdd,
    onSuccess(data) {
      const cachedData = client.getQueryData<IGetMapMarkersResults>(["/map"]);

      if (cachedData) {
        client.setQueryData(["/map"], () => {
          return {
            ...cachedData,
            items: [data, ...cachedData.items],
          };
        });
      }
    },
  });

  const { mutate: remove, isLoading: isRemoving } = useMutation<
    IRemoveMapMarkersResults,
    AxiosError,
    IMapMarkersProps
  >({
    mutationKey: ["/map/marker/remove"],
    mutationFn: mutationFnRemove,
    onSuccess(data, variables) {
      const cachedData = client.getQueryData<IGetMapMarkersResults>(["/map"]);

      if (cachedData) {
        client.setQueryData(["/map"], () => {
          return {
            ...cachedData,
            items: cachedData.items.filter(
              (item) => item.id !== variables.markerId
            ),
          };
        });
      }
    },
  });

  return {
    add,
    remove,
    isLoading: isAdding || isRemoving,
  };
};
