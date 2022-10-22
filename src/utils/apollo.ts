/**
 * TODO: Determine whether there's a better way to check for
 * active queries in Apollo Client
 */

import {
  ApolloCache as ApolloCacheDefault,
  DocumentNode,
} from "@apollo/client";
import produce from "immer";
import client from "../client";
import { ApolloCache, DefinitionNode, RootQuery } from "../types/apollo";

/**
 * Check whether a query is currently active in Apollo Client
 */
export const isActiveQuery = (query: DocumentNode) => {
  const cache: ApolloCache = client.cache;
  const definitions = query.definitions as unknown as DefinitionNode[];
  const operationDefition = definitions.find(
    (def) => def.kind === "OperationDefinition"
  );
  if (operationDefition?.operation !== "query" || !cache.data) {
    return;
  }
  // Get query name with "Query" suffix removed
  const queryName = operationDefition.name.value
    .toLowerCase()
    .replace("query", "");
  const activeQueries = getActiveQueries();

  return !!activeQueries[queryName];
};

export const getActiveQueries = () => {
  const cache: ApolloCache = client.cache;
  if (!cache.data) {
    return [];
  }
  return Object.entries(cache.data.data.ROOT_QUERY).reduce<RootQuery>(
    (result, [name, query]) => {
      // Strip any argument syntax from query name
      const formattedName = name.split("(")[0];
      result[formattedName] = query;
      return result;
    },
    {}
  );
};

export const filterInactiveQueries = (queries: DocumentNode[]) =>
  queries.reduce<DocumentNode[]>((result, query) => {
    if (isActiveQuery(query)) {
      result.push(query);
    }
    return result;
  }, []);

export const updateQuery = (
  cache: ApolloCacheDefault<any>,
  query: DocumentNode,
  variables: Record<string, any>,
  recipe: () => void
) => {
  if (!isActiveQuery(query)) {
    return;
  }
  const queryName = "TODO: Get actual query name here";
  cache.updateQuery(
    {
      query,
      variables,
    },
    (queryData) => {
      if (!queryData) {
        return;
      }
      return {
        [queryName]: produce(queryData[queryName], recipe),
      };
    }
  );
};
