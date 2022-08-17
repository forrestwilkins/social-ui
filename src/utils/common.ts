import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import Router from "next/router";
import { isValidElement, ReactNode } from "react";
import { animateScroll } from "react-scroll";
import { refreshToken } from "../client";
import {
  API_ROOT,
  HttpMethod,
  MULTI_PART_FORM_HEADER,
  SCROLL_DURATION,
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

/**
 * Returns whether or not a given node can be successfully rendered.
 * Useful for checking whether a component has been passed any children.
 */
export const isRenderable = (node: ReactNode): boolean => {
  switch (typeof node) {
    case "string":
    case "number":
      return true;
    default:
      if (Array.isArray(node) && node.length) {
        return Boolean(node.reduce((a, b) => a && isRenderable(b), true));
      }
      return isValidElement(node);
  }
};

export const scrollTop = () => {
  const options = { smooth: true, duration: SCROLL_DURATION };
  animateScroll.scrollToTop(options);
};
