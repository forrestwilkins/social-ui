import createCache from "@emotion/cache";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import cryptoRandomString from "crypto-random-string";
import { t } from "i18next";
import Router from "next/router";
import React, { isValidElement, ReactNode } from "react";
import { animateScroll } from "react-scroll";
import { refreshToken } from "../apollo/auth/links/refresh-token.link";
import { isRefreshingTokenVar, toastVar } from "../apollo/cache";
import {
  API_ROOT,
  Environments,
  HttpMethod,
  SCROLL_DURATION,
} from "../constants/common.constants";

export const multiPartRequest = async <T>(
  path: string,
  data: Record<string, any>
) => {
  // Prevent Axios from interfering with Apollo refresh logic
  await waitFor(() => !isRefreshingTokenVar());

  // Set auth refresh interceptor for Axios requests
  createAuthRefreshInterceptor(axios, refreshToken);

  const response = await axios.request<T>({
    headers: { "Content-Type": "multipart/form-data" },
    method: HttpMethod.Post,
    url: `${API_ROOT}${path}`,
    data,
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

export const initAxe = () => {
  if (
    typeof window !== "undefined" &&
    process.env.NODE_ENV !== Environments.Production
  ) {
    const ReactDOM = require("react-dom");
    const axe = require("@axe-core/react");
    axe(React, ReactDOM, 1000);
  }
};

export const waitFor = (conditionFn: () => boolean, ms = 250) => {
  const poll = (resolve: (_?: unknown) => void) => {
    if (conditionFn()) {
      resolve();
    } else {
      setTimeout(() => poll(resolve), ms);
    }
  };
  return new Promise(poll);
};

export const inDevToast = () => {
  toastVar({
    status: "info",
    title: t("prompts.featureInDevelopment"),
  });
};

export const scrollTop = () => {
  const options = { smooth: true, duration: SCROLL_DURATION };
  animateScroll.scrollToTop(options);
};

export const createEmotionCache = () => createCache({ key: "css" });
export const generateRandom = () => cryptoRandomString({ length: 8 });
export const redirectTo = (path: string) => Router.push(path);
