import axios from "axios";

import { getToken } from "../providers/authProvider";

export interface IHttpError {
  status: number;
  message?: string;
}

const client = axios.create({ baseURL: process.env.REACT_APP_API_URL || "" });

const request = () => {
  const token = getToken().authToken;
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return client;
};

export default request;
