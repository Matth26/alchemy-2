import { print } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Cursor: { input: any; output: any };
  DateTime: { input: any; output: any };
  felt252: { input: any; output: any };
  u32: { input: any; output: any };
};

export type ComponentUnion = Elements;

export enum Direction {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type Elements = {
  __typename?: 'Elements';
  element?: Maybe<Scalars['u32']['output']>;
  entity?: Maybe<Entity>;
};

export type ElementsConnection = {
  __typename?: 'ElementsConnection';
  edges?: Maybe<Array<Maybe<ElementsEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type ElementsEdge = {
  __typename?: 'ElementsEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Elements>;
};

export type ElementsOrder = {
  direction: Direction;
  field: ElementsOrderOrderField;
};

export enum ElementsOrderOrderField {
  Element = 'ELEMENT',
}

export type ElementsWhereInput = {
  element?: InputMaybe<Scalars['Int']['input']>;
  elementGT?: InputMaybe<Scalars['Int']['input']>;
  elementGTE?: InputMaybe<Scalars['Int']['input']>;
  elementLT?: InputMaybe<Scalars['Int']['input']>;
  elementLTE?: InputMaybe<Scalars['Int']['input']>;
  elementNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type Entity = {
  __typename?: 'Entity';
  componentNames?: Maybe<Scalars['String']['output']>;
  components?: Maybe<Array<Maybe<ComponentUnion>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EntityConnection = {
  __typename?: 'EntityConnection';
  edges?: Maybe<Array<Maybe<EntityEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type EntityEdge = {
  __typename?: 'EntityEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Entity>;
};

export type Event = {
  __typename?: 'Event';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Scalars['String']['output']>;
  systemCall: SystemCall;
  systemCallId?: Maybe<Scalars['Int']['output']>;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  edges?: Maybe<Array<Maybe<EventEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Event>;
};

export type Query = {
  __typename?: 'Query';
  elementsComponents?: Maybe<ElementsConnection>;
  entities?: Maybe<EntityConnection>;
  entity: Entity;
  event: Event;
  events?: Maybe<EventConnection>;
  system: System;
  systemCall: SystemCall;
  systemCalls?: Maybe<SystemCallConnection>;
  systems?: Maybe<SystemConnection>;
};

export type QueryElementsComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ElementsOrder>;
  where?: InputMaybe<ElementsWhereInput>;
};

export type QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryEntityArgs = {
  id: Scalars['ID']['input'];
};

export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};

export type QuerySystemArgs = {
  id: Scalars['ID']['input'];
};

export type QuerySystemCallArgs = {
  id: Scalars['Int']['input'];
};

export type System = {
  __typename?: 'System';
  classHash?: Maybe<Scalars['felt252']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  systemCalls: Array<SystemCall>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type SystemCall = {
  __typename?: 'SystemCall';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  system: System;
  systemId?: Maybe<Scalars['ID']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type SystemCallConnection = {
  __typename?: 'SystemCallConnection';
  edges?: Maybe<Array<Maybe<SystemCallEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type SystemCallEdge = {
  __typename?: 'SystemCallEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<SystemCall>;
};

export type SystemConnection = {
  __typename?: 'SystemConnection';
  edges?: Maybe<Array<Maybe<SystemEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type SystemEdge = {
  __typename?: 'SystemEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<System>;
};

export type GetEntitiesQueryVariables = Exact<{ [key: string]: never }>;

export type GetEntitiesQuery = {
  __typename?: 'Query';
  entities?: {
    __typename?: 'EntityConnection';
    edges?: Array<{
      __typename?: 'EntityEdge';
      node?: {
        __typename?: 'Entity';
        keys?: Array<string | null> | null;
        components?: Array<{
          __typename: 'Elements';
          element?: any | null;
        } | null> | null;
      } | null;
    } | null> | null;
  } | null;
};

export const GetEntitiesDocument = gql`
  query getEntities {
    entities(keys: ["%"]) {
      edges {
        node {
          keys
          components {
            __typename
            ... on Elements {
              element
            }
          }
        }
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action();
const GetEntitiesDocumentString = print(GetEntitiesDocument);
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    getEntities(
      variables?: GetEntitiesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<{
      data: GetEntitiesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetEntitiesQuery>(
            GetEntitiesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getEntities',
        'query'
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
