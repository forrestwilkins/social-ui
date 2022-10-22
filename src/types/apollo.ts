import { ApolloCache as ApolloCacheDefault } from "@apollo/client";

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
