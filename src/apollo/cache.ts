// TODO: Consider breaking up by entity type into respective src/client sub-folders

import { InMemoryCache, makeVar } from "@apollo/client";
import { Breadcrumb, ToastNotification } from "../types/common.types";

// App state
export const toastVar = makeVar<ToastNotification | null>(null);
export const breadcrumbsVar = makeVar<Breadcrumb[]>([]);
export const isNavDrawerOpenVar = makeVar(false);

// TODO: Remove reactive vars for authentication loading states,
// which are already tracked with Apollo Client

// Authentication state
export const isLoggedInVar = makeVar(false);
export const isAuthLoadingVar = makeVar(false);
export const isRefreshingTokenVar = makeVar(false);

/**
 * TODO: Determine whether defining custom merge functions as done below is
 * the correct way to silence warnings seen when deleting items from cache
 */
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
    User: {
      fields: {
        posts: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
    Post: {
      fields: {
        images: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
    Group: {
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
