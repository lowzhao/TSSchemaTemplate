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
  emitContext: Scalars['Boolean'];
  auth: User;
  checkLogin: User;
  signOut: Scalars['Boolean'];
};


export type QueryUserArgs = {
  _id: Scalars['String'];
};


export type QueryAuthArgs = {
  password: Scalars['String'];
  name: Scalars['String'];
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


export type Mutation = {
  __typename?: 'Mutation';
  userCreate: User;
  userUpdate: User;
};


export type MutationUserUpdateArgs = {
  userInput: UserInput;
};

export type UserInput = {
  name?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  friends?: Maybe<Array<Scalars['ObjectId']>>;
};


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

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'name'>
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
export const UsersDocument = gql`
    query users {
  users {
    _id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
    document = UsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }