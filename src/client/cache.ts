import { InMemoryCache, makeVar } from "@apollo/client";
import { Breadcrumb, ToastNotification } from "../types/common.types";

// App state
export const isNavDrawerOpenVar = makeVar(false);
export const toastVar = makeVar<ToastNotification | null>(null);
export const breadcrumbsVar = makeVar<Breadcrumb[]>([]);

// TODO: Remove reactive vars for authentication loading states,
// which are already tracked with Apollo Client

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
        groups: {
          merge(_, incoming) {
            return incoming;
          },
        },
        memberRequests: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

export default cache;
