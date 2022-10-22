/**
 * TODO: Determine whether there's a better way to check for
 * active queries in Apollo Client
 */

import {
  ApolloCache as ApolloCacheDefault,
  DocumentNode,
} from "@apollo/client";
import client from "../client";

type RootQuery = Record<string, any>;

interface ApolloCache extends ApolloCacheDefault<any> {
  data?: {
    data: {
      ROOT_QUERY: RootQuery;
    };
  };
}

interface DefinitionNode {
  kind: "OperationDefinition" | "FragmentDefinition";
  operation: "query" | "mutation";
  name: {
    value: string;
  };
}

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
