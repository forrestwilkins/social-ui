import { DocumentNode } from "@apollo/client";
import produce from "immer";
import { WritableDraft } from "immer/dist/internal";
import client from "../client";
import {
  ApolloCache,
  DefinitionNode,
  UpdateQueryOptions,
} from "../types/apollo";

export const updateQuery = <T>(
  { query, variables }: UpdateQueryOptions,
  recipe: (draft: WritableDraft<T>) => void
) => {
  const { cache } = client;
  const queryName = getQueryName(query);
  const isActive = isActiveQuery(query, variables);
  if (!queryName || !isActive) {
    return;
  }
  cache.updateQuery({ query, variables }, (queryData) => {
    if (!queryData) {
      return;
    }
    return { [queryName]: produce(queryData[queryName], recipe) };
  });
};

export const getQueryName = (query: DocumentNode) => {
  const cache: ApolloCache = client.cache;
  const definitions = query.definitions as unknown as DefinitionNode[];
  const operationDefition = definitions.find(
    (def) => def.kind === "OperationDefinition"
  );
  if (operationDefition?.operation !== "query" || !cache.data) {
    return "";
  }
  // Get query name with "Query" suffix removed
  let queryName = operationDefition.name.value.replace("Query", "");

  // Convert first letter to lower case
  queryName = queryName.charAt(0).toLowerCase() + queryName.slice(1);

  return queryName;
};

/**
 * Check whether a query is currently active in Apollo Client
 */
export const isActiveQuery = (
  query: DocumentNode,
  variables: Record<string, any> = {}
) => {
  const queryName = getQueryName(query);
  const activeQueries = getActiveQueries();

  // TODO: Consider refactoring to use reduce instead
  for (const query of Object.keys(activeQueries)) {
    const queryNameMatch = query.split("(")[0].includes(queryName);
    const variablesMatch = Object.entries(variables).every(([key, value]) => {
      const keyMatch = query.includes(key);
      const valueMatch = query.includes(String(value));
      return keyMatch && valueMatch;
    });

    if (queryNameMatch && variablesMatch) {
      return true;
    }
  }
};

/**
 * TODO: Determine whether there's a better way to check for
 * active queries in Apollo Client
 */
export const getActiveQueries = () => {
  const cache: ApolloCache = client.cache;
  if (!cache.data) {
    return [];
  }
  return cache.data.data.ROOT_QUERY;
};

export const filterInactiveQueries = (queries: DocumentNode[]) =>
  queries.reduce<DocumentNode[]>((result, query) => {
    if (isActiveQuery(query)) {
      result.push(query);
    }
    return result;
  }, []);
