import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Void: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  deleteTodo?: Maybe<Scalars['Void']>;
  deleteTodos?: Maybe<Scalars['Void']>;
  updateTodo: Todo;
  updateTodos: Scalars['Int'];
};


export type MutationCreateTodoArgs = {
  input: TodoCreateInput;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['String'];
};


export type MutationDeleteTodosArgs = {
  completed?: InputMaybe<Scalars['Boolean']>;
};


export type MutationUpdateTodoArgs = {
  input: TodoUpdateInput;
};


export type MutationUpdateTodosArgs = {
  input: TodoUpdateManyInput;
};

export type Query = {
  __typename?: 'Query';
  todo?: Maybe<Todo>;
  todos: Array<Todo>;
};


export type QueryTodoArgs = {
  id: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  completed: Scalars['Boolean'];
  description: Scalars['String'];
  id: Scalars['String'];
};

export type TodoCreateInput = {
  completed?: InputMaybe<Scalars['Boolean']>;
  description: Scalars['String'];
};

export type TodoUpdateInput = {
  completed?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};

export type TodoUpdateManyInput = {
  completed?: InputMaybe<Scalars['Boolean']>;
};

export type TodoApp_Item_TodoFragment = { __typename?: 'Todo', id: string, description: string, completed: boolean };

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo?: any | null };

export type UpdateTodoMutationVariables = Exact<{
  input: TodoUpdateInput;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', id: string, description: string, completed: boolean } };

export type UpdateTodosMutationVariables = Exact<{
  input: TodoUpdateManyInput;
}>;


export type UpdateTodosMutation = { __typename?: 'Mutation', updateTodos: number };

export type DeleteCompletedTodosMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteCompletedTodosMutation = { __typename?: 'Mutation', deleteTodos?: any | null };

export type CreateTodoMutationVariables = Exact<{
  input: TodoCreateInput;
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', id: string } };

export type GetTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: string, description: string, completed: boolean }> };

export const TodoApp_Item_TodoFragmentDoc = gql`
    fragment TodoApp_Item_Todo on Todo {
  id
  description
  completed
}
    `;
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($id: String!) {
  deleteTodo(id: $id)
}
    `;
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($input: TodoUpdateInput!) {
  updateTodo(input: $input) {
    id
    description
    completed
  }
}
    `;
export const UpdateTodosDocument = gql`
    mutation UpdateTodos($input: TodoUpdateManyInput!) {
  updateTodos(input: $input)
}
    `;
export const DeleteCompletedTodosDocument = gql`
    mutation DeleteCompletedTodos {
  deleteTodos(completed: true)
}
    `;
export const CreateTodoDocument = gql`
    mutation CreateTodo($input: TodoCreateInput!) {
  createTodo(input: $input) {
    id
  }
}
    `;
export const GetTodosDocument = gql`
    query GetTodos {
  todos {
    ...TodoApp_Item_Todo
  }
}
    ${TodoApp_Item_TodoFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    DeleteTodo(variables: DeleteTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteTodoMutation>(DeleteTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteTodo');
    },
    UpdateTodo(variables: UpdateTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTodoMutation>(UpdateTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateTodo');
    },
    UpdateTodos(variables: UpdateTodosMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTodosMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTodosMutation>(UpdateTodosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateTodos');
    },
    DeleteCompletedTodos(variables?: DeleteCompletedTodosMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteCompletedTodosMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteCompletedTodosMutation>(DeleteCompletedTodosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteCompletedTodos');
    },
    CreateTodo(variables: CreateTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTodoMutation>(CreateTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateTodo');
    },
    GetTodos(variables?: GetTodosQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTodosQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTodosQuery>(GetTodosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTodos');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;