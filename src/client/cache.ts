import { InMemoryCache, makeVar } from "@apollo/client";
import { ToastNotification } from "../types/common";

// App state
export const isNavDrawerOpenVar = makeVar(false);
export const toastVar = makeVar<ToastNotification | null>(null);

// Authentication state
export const isLoggedInVar = makeVar(false);
export const isAuthLoadingVar = makeVar(false);
export const isRefreshingTokenVar = makeVar(false);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

export default cache;
