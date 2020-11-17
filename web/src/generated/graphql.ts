import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** Mongo object id scalar type */
  ObjectId: any;
};



export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users: Array<User>;
  auth: User;
  checkLogin: User;
  signOut: Scalars['Boolean'];
  chat?: Maybe<Chat>;
  chats: Array<Chat>;
};


export type QueryUserArgs = {
  _id: Scalars['ObjectId'];
};


export type QueryAuthArgs = {
  password: Scalars['String'];
  name: Scalars['String'];
};


export type QueryChatArgs = {
  _id: Scalars['ObjectId'];
};


export type QueryChatsArgs = {
  dateAfter?: Maybe<Scalars['DateTime']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  lastUpdatedAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  _id: Scalars['ID'];
  name: Scalars['String'];
  color: Scalars['String'];
  friends: Array<User>;
};



export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['DateTime'];
  lastUpdatedAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  _id: Scalars['ID'];
  author: User;
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  userUpdate: User;
  chatCreate: Chat;
};


export type MutationUserUpdateArgs = {
  userInput: UserInput;
};


export type MutationChatCreateArgs = {
  text: Scalars['String'];
};

export type UserInput = {
  name?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  friends?: Maybe<Array<Scalars['ObjectId']>>;
};

export type ChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatsQuery = (
  { __typename?: 'Query' }
  & { chats: Array<(
    { __typename?: 'Chat' }
    & Pick<Chat, 'text'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name' | 'color'>
    ) }
  )> }
);

export type CreateChatMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type CreateChatMutation = (
  { __typename?: 'Mutation' }
  & { chatCreate: (
    { __typename?: 'Chat' }
    & Pick<Chat, 'text'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name' | 'color'>
    ) }
  ) }
);

export type UpdateColorMutationVariables = Exact<{
  color: Scalars['String'];
}>;


export type UpdateColorMutation = (
  { __typename?: 'Mutation' }
  & { userUpdate: (
    { __typename?: 'User' }
    & Pick<User, '_id'>
  ) }
);

export type AuthQueryVariables = Exact<{
  name: Scalars['String'];
  pass: Scalars['String'];
}>;


export type AuthQuery = (
  { __typename?: 'Query' }
  & { auth: (
    { __typename?: 'User' }
    & UserFragFragment
  ) }
);

export type SignOutQueryVariables = Exact<{ [key: string]: never; }>;


export type SignOutQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'signOut'>
);

export type CheckLoginQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckLoginQuery = (
  { __typename?: 'Query' }
  & { checkLogin: (
    { __typename?: 'User' }
    & UserFragFragment
  ) }
);

export type UserFragFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'name' | 'color'>
  & { friends: Array<(
    { __typename?: 'User' }
    & Pick<User, '_id'>
  )> }
);

export const UserFragFragmentDoc = gql`
    fragment UserFrag on User {
  _id
  name
  friends {
    _id
  }
  color
}
    `;
export const ChatsDocument = gql`
    query chats {
  chats {
    text
    author {
      _id
      name
      color
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ChatsGQL extends Apollo.Query<ChatsQuery, ChatsQueryVariables> {
    document = ChatsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateChatDocument = gql`
    mutation createChat($text: String!) {
  chatCreate(text: $text) {
    text
    author {
      _id
      name
      color
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateChatGQL extends Apollo.Mutation<CreateChatMutation, CreateChatMutationVariables> {
    document = CreateChatDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateColorDocument = gql`
    mutation updateColor($color: String!) {
  userUpdate(userInput: {color: $color}) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateColorGQL extends Apollo.Mutation<UpdateColorMutation, UpdateColorMutationVariables> {
    document = UpdateColorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AuthDocument = gql`
    query auth($name: String!, $pass: String!) {
  auth(name: $name, password: $pass) {
    ...UserFrag
  }
}
    ${UserFragFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AuthGQL extends Apollo.Query<AuthQuery, AuthQueryVariables> {
    document = AuthDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SignOutDocument = gql`
    query signOut {
  signOut
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SignOutGQL extends Apollo.Query<SignOutQuery, SignOutQueryVariables> {
    document = SignOutDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CheckLoginDocument = gql`
    query checkLogin {
  checkLogin {
    ...UserFrag
  }
}
    ${UserFragFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CheckLoginGQL extends Apollo.Query<CheckLoginQuery, CheckLoginQueryVariables> {
    document = CheckLoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }