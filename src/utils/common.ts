import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import Router from "next/router";
import { refreshToken } from "../client";
import {
  API_ROOT,
  HttpMethod,
  MULTI_PART_FORM_HEADER,
} from "../constants/common";

export const redirectTo = (path: string) => Router.push(path);

export const generateRandom = (): string =>
  Math.random()
    .toString(36)
    .slice(2, 10)
    .split("")
    .map((c) => (Math.random() < 0.5 ? c : c.toUpperCase()))
    .join("");

export const multiPartRequest = async <T>(
  method: HttpMethod,
  path: string,
  data: Record<string, any>
) => {
  createAuthRefreshInterceptor(axios, refreshToken);
  const url = `${API_ROOT}${path}`;
  const response = await axios.request<T>({
    url,
    method,
    data,
    headers: MULTI_PART_FORM_HEADER,
  });
  return response.data;
};
