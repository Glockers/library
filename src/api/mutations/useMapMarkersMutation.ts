import { useMutation } from "@tanstack/react-query";
import request, { IHttpError } from "../utils";
import { AxiosError } from "axios";

export interface IMapMarkersResults {
  markerId: string;
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

// TODO remove AFTER ADD BACKEND
const mockData: IMapMarkersResults = {
  markerId: "done",
};

const mutationFnAdd = async (data: IMapMarkersAddProps) => {
  // const response = await request().post<IMapMarkersResults>('/map/marker/add', data);
  // return response.data;
  return mockData;
};

const mutationFnUpdate = async (data: IMapMarkersUpdateProps) => {
  // const response = await request().post<IMapMarkersResults>('/map/marker/update', data);
  // return response.data;
  return mockData;
};

const mutationFnRemove = async (data: IMapMarkersProps) => {
  // const response = await request().post<IMapMarkersResults>('/map/marker/remove', data);
  // return response.data;
  return mockData;
};

export const useMapMarkersMutation = () => {
  const { mutate: add, isLoading: isAdding } = useMutation<
    IMapMarkersResults,
    AxiosError,
    IMapMarkersAddProps
  >({
    mutationKey: ["/map/marker/add"],
    mutationFn: mutationFnAdd,
  });

  const { mutate: update, isLoading: isUpdating } = useMutation<
    IMapMarkersResults,
    AxiosError,
    IMapMarkersUpdateProps
  >({
    mutationKey: ["/map/marker/update"],
    mutationFn: mutationFnUpdate,
  });

  const { mutate: remove, isLoading: isRemoving } = useMutation<
    IMapMarkersResults,
    AxiosError,
    IMapMarkersProps
  >({
    mutationKey: ["/map/marker/remove"],
    mutationFn: mutationFnRemove,
  });

  return {
    add,
    remove,
    update,
    isLoading: isAdding || isRemoving || isUpdating,
  };
};
