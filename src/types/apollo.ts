import {
  ApolloCache as ApolloCacheDefault,
  DocumentNode,
} from "@apollo/client";

export type RootQuery = Record<string, any>;

export interface ApolloCache extends ApolloCacheDefault<any> {
  data?: {
    data: {
      ROOT_QUERY: RootQuery;
    };
  };
}

export interface DefinitionNode {
  kind: "OperationDefinition" | "FragmentDefinition";
  operation: "query" | "mutation";
  name: {
    value: string;
  };
}

export interface UpdateQueryOptions {
  query: DocumentNode;
  variables?: Record<string, any>;
}
