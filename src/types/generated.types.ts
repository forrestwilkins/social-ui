/* eslint-disable */
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
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
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Group = {
  __typename?: "Group";
  coverPhoto?: Maybe<Image>;
  createdAt: Scalars["DateTime"];
  description: Scalars["String"];
  id: Scalars["Int"];
  images: Array<Image>;
  memberCount: Scalars["Int"];
  memberRequestCount: Scalars["Int"];
  members: Array<GroupMember>;
  name: Scalars["String"];
  posts: Array<Post>;
  updatedAt: Scalars["DateTime"];
};

export type GroupInput = {
  description: Scalars["String"];
  id?: InputMaybe<Scalars["Int"]>;
  name: Scalars["String"];
};

export type GroupMember = {
  __typename?: "GroupMember";
  createdAt: Scalars["DateTime"];
  group?: Maybe<Group>;
  groupId?: Maybe<Scalars["Float"]>;
  id: Scalars["Int"];
  updatedAt: Scalars["DateTime"];
  user: User;
  userId: Scalars["Float"];
};

export type Image = {
  __typename?: "Image";
  createdAt: Scalars["DateTime"];
  filename: Scalars["String"];
  group: Group;
  groupId: Scalars["Float"];
  id: Scalars["Int"];
  imageType: Scalars["String"];
  post: Post;
  postId: Scalars["Float"];
  updatedAt: Scalars["DateTime"];
  user: User;
  userId: Scalars["Float"];
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MemberRequest = {
  __typename?: "MemberRequest";
  createdAt: Scalars["DateTime"];
  group?: Maybe<Group>;
  groupId?: Maybe<Scalars["Float"]>;
  id: Scalars["Int"];
  status: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  user: User;
  userId: Scalars["Float"];
};

export type Mutation = {
  __typename?: "Mutation";
  approveMemberRequest: GroupMember;
  cancelMemberRequest: Group;
  createGroup: Group;
  createMemberRequest: MemberRequest;
  createPost: Post;
  deleteGroup: Scalars["Boolean"];
  deleteImage: Scalars["Boolean"];
  deletePost: Scalars["Boolean"];
  deleteUser: Scalars["Boolean"];
  denyMemberRequest: Scalars["Boolean"];
  leaveGroup: Scalars["Boolean"];
  logOut: Scalars["Boolean"];
  login: Scalars["Boolean"];
  refreshToken: Scalars["Boolean"];
  signUp: Scalars["Boolean"];
  updateGroup: Group;
  updatePost: Post;
  updateUser: User;
};

export type MutationApproveMemberRequestArgs = {
  id: Scalars["Int"];
};

export type MutationCancelMemberRequestArgs = {
  id: Scalars["Int"];
};

export type MutationCreateGroupArgs = {
  groupData: GroupInput;
};

export type MutationCreateMemberRequestArgs = {
  groupId: Scalars["Int"];
};

export type MutationCreatePostArgs = {
  postData: PostInput;
};

export type MutationDeleteGroupArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteImageArgs = {
  id: Scalars["Int"];
};

export type MutationDeletePostArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["Int"];
};

export type MutationDenyMemberRequestArgs = {
  id: Scalars["Int"];
};

export type MutationLeaveGroupArgs = {
  id: Scalars["Int"];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationUpdateGroupArgs = {
  groupData: GroupInput;
};

export type MutationUpdatePostArgs = {
  id: Scalars["Int"];
  postData: PostInput;
};

export type MutationUpdateUserArgs = {
  userData: UserInput;
};

export type Post = {
  __typename?: "Post";
  body: Scalars["String"];
  createdAt: Scalars["DateTime"];
  group?: Maybe<Group>;
  groupId?: Maybe<Scalars["Float"]>;
  id: Scalars["Int"];
  images: Array<Image>;
  updatedAt: Scalars["DateTime"];
  user: User;
  userId: Scalars["Float"];
};

export type PostInput = {
  body?: InputMaybe<Scalars["String"]>;
  groupId?: InputMaybe<Scalars["Int"]>;
};

export type Query = {
  __typename?: "Query";
  authCheck: Scalars["Boolean"];
  group: Group;
  groupMembers: Array<GroupMember>;
  groups: Array<Group>;
  me: User;
  memberRequest?: Maybe<MemberRequest>;
  memberRequests: Array<MemberRequest>;
  post: Post;
  posts: Array<Post>;
  user: User;
  users: Array<User>;
};

export type QueryGroupArgs = {
  name: Scalars["String"];
};

export type QueryMemberRequestArgs = {
  groupId: Scalars["Int"];
};

export type QueryMemberRequestsArgs = {
  groupId: Scalars["Int"];
};

export type QueryPostArgs = {
  id: Scalars["Int"];
};

export type QueryUserArgs = {
  id?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type SignUpInput = {
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
};

export type User = {
  __typename?: "User";
  bio?: Maybe<Scalars["String"]>;
  coverPhoto?: Maybe<Image>;
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  id: Scalars["Int"];
  images: Array<Image>;
  name: Scalars["String"];
  posts: Array<Post>;
  profilePicture: Image;
  updatedAt: Scalars["DateTime"];
};

export type UserInput = {
  bio: Scalars["String"];
  email: Scalars["String"];
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;

export type SignUpMutation = { __typename?: "Mutation"; signUp: boolean };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = { __typename?: "Mutation"; login: boolean };

export type LogOutMutationVariables = Exact<{ [key: string]: never }>;

export type LogOutMutation = { __typename?: "Mutation"; logOut: boolean };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never }>;

export type RefreshTokenMutation = {
  __typename?: "Mutation";
  refreshToken: boolean;
};

export type AuthCheckQueryVariables = Exact<{ [key: string]: never }>;

export type AuthCheckQuery = { __typename?: "Query"; authCheck: boolean };

export type GroupFragmentFragment = {
  __typename?: "Group";
  id: number;
  name: string;
  description: string;
  memberCount: number;
  memberRequestCount: number;
  coverPhoto?: { __typename?: "Image"; filename: string; id: number } | null;
};

export type GroupProfileFragmentFragment = {
  __typename?: "Group";
  id: number;
  name: string;
  description: string;
  memberCount: number;
  memberRequestCount: number;
  posts: Array<{
    __typename?: "Post";
    id: number;
    body: string;
    createdAt: any;
    updatedAt: any;
    images: Array<{ __typename?: "Image"; filename: string; id: number }>;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; filename: string; id: number };
    };
    group?: {
      __typename?: "Group";
      id: number;
      name: string;
      coverPhoto?: {
        __typename?: "Image";
        filename: string;
        id: number;
      } | null;
    } | null;
  }>;
  members: Array<{
    __typename?: "GroupMember";
    id: number;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; filename: string; id: number };
    };
  }>;
  coverPhoto?: { __typename?: "Image"; filename: string; id: number } | null;
};

export type CreateGroupMutationMutationVariables = Exact<{
  groupData: GroupInput;
}>;

export type CreateGroupMutationMutation = {
  __typename?: "Mutation";
  createGroup: {
    __typename?: "Group";
    id: number;
    name: string;
    description: string;
    memberCount: number;
    memberRequestCount: number;
    coverPhoto?: { __typename?: "Image"; filename: string; id: number } | null;
  };
};

export type UpdateGroupMutationMutationVariables = Exact<{
  groupData: GroupInput;
}>;

export type UpdateGroupMutationMutation = {
  __typename?: "Mutation";
  updateGroup: {
    __typename?: "Group";
    id: number;
    name: string;
    description: string;
  };
};

export type DeleteGroupMutationMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteGroupMutationMutation = {
  __typename?: "Mutation";
  deleteGroup: boolean;
};

export type LeaveGroupMutationMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type LeaveGroupMutationMutation = {
  __typename?: "Mutation";
  leaveGroup: boolean;
};

export type CreateMemberRequestMutationMutationVariables = Exact<{
  groupId: Scalars["Int"];
}>;

export type CreateMemberRequestMutationMutation = {
  __typename?: "Mutation";
  createMemberRequest: {
    __typename?: "MemberRequest";
    id: number;
    status: string;
    group?: { __typename?: "Group"; id: number } | null;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; filename: string; id: number };
    };
  };
};

export type ApproveMemberRequestMutationMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type ApproveMemberRequestMutationMutation = {
  __typename?: "Mutation";
  approveMemberRequest: {
    __typename?: "GroupMember";
    id: number;
    group?: { __typename?: "Group"; id: number; name: string } | null;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; filename: string; id: number };
    };
  };
};

export type CancelMemberRequestMutationMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type CancelMemberRequestMutationMutation = {
  __typename?: "Mutation";
  cancelMemberRequest: { __typename?: "Group"; id: number; name: string };
};

export type GroupQueryQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type GroupQueryQuery = {
  __typename?: "Query";
  group: {
    __typename?: "Group";
    id: number;
    name: string;
    description: string;
    memberCount: number;
    memberRequestCount: number;
    posts: Array<{
      __typename?: "Post";
      id: number;
      body: string;
      createdAt: any;
      updatedAt: any;
      images: Array<{ __typename?: "Image"; filename: string; id: number }>;
      user: {
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; filename: string; id: number };
      };
      group?: {
        __typename?: "Group";
        id: number;
        name: string;
        coverPhoto?: {
          __typename?: "Image";
          filename: string;
          id: number;
        } | null;
      } | null;
    }>;
    members: Array<{
      __typename?: "GroupMember";
      id: number;
      user: {
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; filename: string; id: number };
      };
    }>;
    coverPhoto?: { __typename?: "Image"; filename: string; id: number } | null;
  };
};

export type GroupsQueryQueryVariables = Exact<{ [key: string]: never }>;

export type GroupsQueryQuery = {
  __typename?: "Query";
  groups: Array<{
    __typename?: "Group";
    id: number;
    name: string;
    description: string;
    memberCount: number;
    memberRequestCount: number;
    coverPhoto?: { __typename?: "Image"; filename: string; id: number } | null;
  }>;
};

export type MemberRequestQueryQueryVariables = Exact<{
  groupId: Scalars["Int"];
}>;

export type MemberRequestQueryQuery = {
  __typename?: "Query";
  memberRequest?: {
    __typename?: "MemberRequest";
    id: number;
    status: string;
  } | null;
};

export type MemberRequestsQueryQueryVariables = Exact<{
  groupId: Scalars["Int"];
}>;

export type MemberRequestsQueryQuery = {
  __typename?: "Query";
  memberRequests: Array<{
    __typename?: "MemberRequest";
    id: number;
    status: string;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; filename: string; id: number };
    };
  }>;
};

export type ImageFragmentFragment = {
  __typename?: "Image";
  filename: string;
  id: number;
};

export type DeleteImageMutationMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteImageMutationMutation = {
  __typename?: "Mutation";
  deleteImage: boolean;
};

export type PostFragmentFragment = {
  __typename?: "Post";
  id: number;
  body: string;
  createdAt: any;
  updatedAt: any;
  images: Array<{ __typename?: "Image"; filename: string; id: number }>;
  user: {
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; filename: string; id: number };
  };
  group?: {
    __typename?: "Group";
    id: number;
    name: string;
    coverPhoto?: { __typename?: "Image"; filename: string; id: number } | null;
  } | null;
};

export type PostMutationFragmentFragment = {
  __typename?: "Post";
  id: number;
  body: string;
  createdAt: any;
  updatedAt: any;
  user: {
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; filename: string; id: number };
  };
  group?: {
    __typename?: "Group";
    id: number;
    name: string;
    coverPhoto?: { __typename?: "Image"; filename: string; id: number } | null;
  } | null;
};

export type CreatePostMutationMutationVariables = Exact<{
  postData: PostInput;
}>;

export type CreatePostMutationMutation = {
  __typename?: "Mutation";
  createPost: {
    __typename?: "Post";
    id: number;
    body: string;
    createdAt: any;
    updatedAt: any;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; filename: string; id: number };
    };
    group?: {
      __typename?: "Group";
      id: number;
      name: string;
      coverPhoto?: {
        __typename?: "Image";
        filename: string;
        id: number;
      } | null;
    } | null;
  };
};

export type UpdatePostMutationMutationVariables = Exact<{
  id: Scalars["Int"];
  postData: PostInput;
}>;

export type UpdatePostMutationMutation = {
  __typename?: "Mutation";
  updatePost: {
    __typename?: "Post";
    id: number;
    body: string;
    createdAt: any;
    updatedAt: any;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; filename: string; id: number };
    };
    group?: {
      __typename?: "Group";
      id: number;
      name: string;
      coverPhoto?: {
        __typename?: "Image";
        filename: string;
        id: number;
      } | null;
    } | null;
  };
};

export type DeletePostMutationMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeletePostMutationMutation = {
  __typename?: "Mutation";
  deletePost: boolean;
};

export type PostsQueryQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQueryQuery = {
  __typename?: "Query";
  posts: Array<{
    __typename?: "Post";
    id: number;
    body: string;
    createdAt: any;
    updatedAt: any;
    images: Array<{ __typename?: "Image"; filename: string; id: number }>;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; filename: string; id: number };
    };
    group?: {
      __typename?: "Group";
      id: number;
      name: string;
      coverPhoto?: {
        __typename?: "Image";
        filename: string;
        id: number;
      } | null;
    } | null;
  }>;
};

export type PostQueryQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type PostQueryQuery = {
  __typename?: "Query";
  post: {
    __typename?: "Post";
    id: number;
    body: string;
    createdAt: any;
    updatedAt: any;
    images: Array<{ __typename?: "Image"; filename: string; id: number }>;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; filename: string; id: number };
    };
    group?: {
      __typename?: "Group";
      id: number;
      name: string;
      coverPhoto?: {
        __typename?: "Image";
        filename: string;
        id: number;
      } | null;
    } | null;
  };
};

export type UserFragmentFragment = {
  __typename?: "User";
  id: number;
  bio?: string | null;
  email: string;
  name: string;
  createdAt: any;
  updatedAt: any;
};

export type UserProfileFragmentFragment = {
  __typename?: "User";
  id: number;
  bio?: string | null;
  email: string;
  name: string;
  createdAt: any;
  updatedAt: any;
  profilePicture: { __typename?: "Image"; filename: string; id: number };
  coverPhoto?: { __typename?: "Image"; filename: string; id: number } | null;
  posts: Array<{
    __typename?: "Post";
    id: number;
    body: string;
    createdAt: any;
    updatedAt: any;
    images: Array<{ __typename?: "Image"; filename: string; id: number }>;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; filename: string; id: number };
    };
    group?: {
      __typename?: "Group";
      id: number;
      name: string;
      coverPhoto?: {
        __typename?: "Image";
        filename: string;
        id: number;
      } | null;
    } | null;
  }>;
};

export type UserProfileLiteFragmentFragment = {
  __typename?: "User";
  id: number;
  bio?: string | null;
  email: string;
  name: string;
  createdAt: any;
  updatedAt: any;
  profilePicture: { __typename?: "Image"; filename: string; id: number };
};

export type UserAvatarFragmentFragment = {
  __typename?: "User";
  id: number;
  name: string;
  profilePicture: { __typename?: "Image"; filename: string; id: number };
};

export type UserMutationFragmentFragment = {
  __typename?: "User";
  id: number;
  name: string;
  email: string;
  bio?: string | null;
};

export type UpdateUserMutationMutationVariables = Exact<{
  userData: UserInput;
}>;

export type UpdateUserMutationMutation = {
  __typename?: "Mutation";
  updateUser: {
    __typename?: "User";
    id: number;
    name: string;
    email: string;
    bio?: string | null;
  };
};

export type MeQueryQueryVariables = Exact<{ [key: string]: never }>;

export type MeQueryQuery = {
  __typename?: "Query";
  me: {
    __typename?: "User";
    id: number;
    bio?: string | null;
    email: string;
    name: string;
    createdAt: any;
    updatedAt: any;
    profilePicture: { __typename?: "Image"; filename: string; id: number };
  };
};

export type UserQueryQueryVariables = Exact<{
  name?: InputMaybe<Scalars["String"]>;
}>;

export type UserQueryQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    id: number;
    bio?: string | null;
    email: string;
    name: string;
    createdAt: any;
    updatedAt: any;
    profilePicture: { __typename?: "Image"; filename: string; id: number };
    coverPhoto?: { __typename?: "Image"; filename: string; id: number } | null;
    posts: Array<{
      __typename?: "Post";
      id: number;
      body: string;
      createdAt: any;
      updatedAt: any;
      images: Array<{ __typename?: "Image"; filename: string; id: number }>;
      user: {
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; filename: string; id: number };
      };
      group?: {
        __typename?: "Group";
        id: number;
        name: string;
        coverPhoto?: {
          __typename?: "Image";
          filename: string;
          id: number;
        } | null;
      } | null;
    }>;
  };
};

export type UsersQueryQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQueryQuery = {
  __typename?: "Query";
  users: Array<{
    __typename?: "User";
    id: number;
    bio?: string | null;
    email: string;
    name: string;
    createdAt: any;
    updatedAt: any;
  }>;
};

export const ImageFragmentFragmentDoc = gql`
  fragment ImageFragment on Image {
    filename
    id
  }
`;
export const GroupFragmentFragmentDoc = gql`
  fragment GroupFragment on Group {
    id
    name
    description
    coverPhoto {
      ...ImageFragment
    }
    memberCount
    memberRequestCount
  }
  ${ImageFragmentFragmentDoc}
`;
export const PostFragmentFragmentDoc = gql`
  fragment PostFragment on Post {
    id
    body
    images {
      ...ImageFragment
    }
    user {
      id
      name
      profilePicture {
        ...ImageFragment
      }
    }
    group {
      id
      name
      coverPhoto {
        ...ImageFragment
      }
    }
    createdAt
    updatedAt
  }
  ${ImageFragmentFragmentDoc}
`;
export const UserAvatarFragmentFragmentDoc = gql`
  fragment UserAvatarFragment on User {
    id
    name
    profilePicture {
      ...ImageFragment
    }
  }
  ${ImageFragmentFragmentDoc}
`;
export const GroupProfileFragmentFragmentDoc = gql`
  fragment GroupProfileFragment on Group {
    ...GroupFragment
    posts {
      ...PostFragment
    }
    members {
      id
      user {
        ...UserAvatarFragment
      }
    }
  }
  ${GroupFragmentFragmentDoc}
  ${PostFragmentFragmentDoc}
  ${UserAvatarFragmentFragmentDoc}
`;
export const PostMutationFragmentFragmentDoc = gql`
  fragment PostMutationFragment on Post {
    id
    body
    user {
      id
      name
      profilePicture {
        ...ImageFragment
      }
    }
    group {
      id
      name
      coverPhoto {
        ...ImageFragment
      }
    }
    createdAt
    updatedAt
  }
  ${ImageFragmentFragmentDoc}
`;
export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    id
    bio
    email
    name
    createdAt
    updatedAt
  }
`;
export const UserProfileFragmentFragmentDoc = gql`
  fragment UserProfileFragment on User {
    ...UserFragment
    profilePicture {
      ...ImageFragment
    }
    coverPhoto {
      ...ImageFragment
    }
    posts {
      ...PostFragment
    }
  }
  ${UserFragmentFragmentDoc}
  ${ImageFragmentFragmentDoc}
  ${PostFragmentFragmentDoc}
`;
export const UserProfileLiteFragmentFragmentDoc = gql`
  fragment UserProfileLiteFragment on User {
    ...UserFragment
    profilePicture {
      ...ImageFragment
    }
  }
  ${UserFragmentFragmentDoc}
  ${ImageFragmentFragmentDoc}
`;
export const UserMutationFragmentFragmentDoc = gql`
  fragment UserMutationFragment on User {
    id
    name
    email
    bio
  }
`;
export const SignUpDocument = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input)
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    options
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input)
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogOutDocument = gql`
  mutation LogOut {
    logOut
  }
`;
export type LogOutMutationFn = Apollo.MutationFunction<
  LogOutMutation,
  LogOutMutationVariables
>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogOutMutation,
    LogOutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(
    LogOutDocument,
    options
  );
}
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<
  LogOutMutation,
  LogOutMutationVariables
>;
export const RefreshTokenDocument = gql`
  mutation RefreshToken {
    refreshToken
  }
`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshTokenDocument, options);
}
export type RefreshTokenMutationHookResult = ReturnType<
  typeof useRefreshTokenMutation
>;
export type RefreshTokenMutationResult =
  Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const AuthCheckDocument = gql`
  query AuthCheck {
    authCheck
  }
`;

/**
 * __useAuthCheckQuery__
 *
 * To run a query within a React component, call `useAuthCheckQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthCheckQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthCheckQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthCheckQuery(
  baseOptions?: Apollo.QueryHookOptions<AuthCheckQuery, AuthCheckQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AuthCheckQuery, AuthCheckQueryVariables>(
    AuthCheckDocument,
    options
  );
}
export function useAuthCheckLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AuthCheckQuery,
    AuthCheckQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AuthCheckQuery, AuthCheckQueryVariables>(
    AuthCheckDocument,
    options
  );
}
export type AuthCheckQueryHookResult = ReturnType<typeof useAuthCheckQuery>;
export type AuthCheckLazyQueryHookResult = ReturnType<
  typeof useAuthCheckLazyQuery
>;
export type AuthCheckQueryResult = Apollo.QueryResult<
  AuthCheckQuery,
  AuthCheckQueryVariables
>;
export const CreateGroupMutationDocument = gql`
  mutation CreateGroupMutation($groupData: GroupInput!) {
    createGroup(groupData: $groupData) {
      ...GroupFragment
    }
  }
  ${GroupFragmentFragmentDoc}
`;
export type CreateGroupMutationMutationFn = Apollo.MutationFunction<
  CreateGroupMutationMutation,
  CreateGroupMutationMutationVariables
>;

/**
 * __useCreateGroupMutationMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutationMutation, { data, loading, error }] = useCreateGroupMutationMutation({
 *   variables: {
 *      groupData: // value for 'groupData'
 *   },
 * });
 */
export function useCreateGroupMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateGroupMutationMutation,
    CreateGroupMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateGroupMutationMutation,
    CreateGroupMutationMutationVariables
  >(CreateGroupMutationDocument, options);
}
export type CreateGroupMutationMutationHookResult = ReturnType<
  typeof useCreateGroupMutationMutation
>;
export type CreateGroupMutationMutationResult =
  Apollo.MutationResult<CreateGroupMutationMutation>;
export type CreateGroupMutationMutationOptions = Apollo.BaseMutationOptions<
  CreateGroupMutationMutation,
  CreateGroupMutationMutationVariables
>;
export const UpdateGroupMutationDocument = gql`
  mutation UpdateGroupMutation($groupData: GroupInput!) {
    updateGroup(groupData: $groupData) {
      id
      name
      description
    }
  }
`;
export type UpdateGroupMutationMutationFn = Apollo.MutationFunction<
  UpdateGroupMutationMutation,
  UpdateGroupMutationMutationVariables
>;

/**
 * __useUpdateGroupMutationMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupMutationMutation, { data, loading, error }] = useUpdateGroupMutationMutation({
 *   variables: {
 *      groupData: // value for 'groupData'
 *   },
 * });
 */
export function useUpdateGroupMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateGroupMutationMutation,
    UpdateGroupMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateGroupMutationMutation,
    UpdateGroupMutationMutationVariables
  >(UpdateGroupMutationDocument, options);
}
export type UpdateGroupMutationMutationHookResult = ReturnType<
  typeof useUpdateGroupMutationMutation
>;
export type UpdateGroupMutationMutationResult =
  Apollo.MutationResult<UpdateGroupMutationMutation>;
export type UpdateGroupMutationMutationOptions = Apollo.BaseMutationOptions<
  UpdateGroupMutationMutation,
  UpdateGroupMutationMutationVariables
>;
export const DeleteGroupMutationDocument = gql`
  mutation DeleteGroupMutation($id: Int!) {
    deleteGroup(id: $id)
  }
`;
export type DeleteGroupMutationMutationFn = Apollo.MutationFunction<
  DeleteGroupMutationMutation,
  DeleteGroupMutationMutationVariables
>;

/**
 * __useDeleteGroupMutationMutation__
 *
 * To run a mutation, you first call `useDeleteGroupMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupMutationMutation, { data, loading, error }] = useDeleteGroupMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGroupMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteGroupMutationMutation,
    DeleteGroupMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteGroupMutationMutation,
    DeleteGroupMutationMutationVariables
  >(DeleteGroupMutationDocument, options);
}
export type DeleteGroupMutationMutationHookResult = ReturnType<
  typeof useDeleteGroupMutationMutation
>;
export type DeleteGroupMutationMutationResult =
  Apollo.MutationResult<DeleteGroupMutationMutation>;
export type DeleteGroupMutationMutationOptions = Apollo.BaseMutationOptions<
  DeleteGroupMutationMutation,
  DeleteGroupMutationMutationVariables
>;
export const LeaveGroupMutationDocument = gql`
  mutation LeaveGroupMutation($id: Int!) {
    leaveGroup(id: $id)
  }
`;
export type LeaveGroupMutationMutationFn = Apollo.MutationFunction<
  LeaveGroupMutationMutation,
  LeaveGroupMutationMutationVariables
>;

/**
 * __useLeaveGroupMutationMutation__
 *
 * To run a mutation, you first call `useLeaveGroupMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveGroupMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveGroupMutationMutation, { data, loading, error }] = useLeaveGroupMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLeaveGroupMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LeaveGroupMutationMutation,
    LeaveGroupMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    LeaveGroupMutationMutation,
    LeaveGroupMutationMutationVariables
  >(LeaveGroupMutationDocument, options);
}
export type LeaveGroupMutationMutationHookResult = ReturnType<
  typeof useLeaveGroupMutationMutation
>;
export type LeaveGroupMutationMutationResult =
  Apollo.MutationResult<LeaveGroupMutationMutation>;
export type LeaveGroupMutationMutationOptions = Apollo.BaseMutationOptions<
  LeaveGroupMutationMutation,
  LeaveGroupMutationMutationVariables
>;
export const CreateMemberRequestMutationDocument = gql`
  mutation CreateMemberRequestMutation($groupId: Int!) {
    createMemberRequest(groupId: $groupId) {
      id
      status
      group {
        id
      }
      user {
        ...UserAvatarFragment
      }
    }
  }
  ${UserAvatarFragmentFragmentDoc}
`;
export type CreateMemberRequestMutationMutationFn = Apollo.MutationFunction<
  CreateMemberRequestMutationMutation,
  CreateMemberRequestMutationMutationVariables
>;

/**
 * __useCreateMemberRequestMutationMutation__
 *
 * To run a mutation, you first call `useCreateMemberRequestMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMemberRequestMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMemberRequestMutationMutation, { data, loading, error }] = useCreateMemberRequestMutationMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useCreateMemberRequestMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMemberRequestMutationMutation,
    CreateMemberRequestMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateMemberRequestMutationMutation,
    CreateMemberRequestMutationMutationVariables
  >(CreateMemberRequestMutationDocument, options);
}
export type CreateMemberRequestMutationMutationHookResult = ReturnType<
  typeof useCreateMemberRequestMutationMutation
>;
export type CreateMemberRequestMutationMutationResult =
  Apollo.MutationResult<CreateMemberRequestMutationMutation>;
export type CreateMemberRequestMutationMutationOptions =
  Apollo.BaseMutationOptions<
    CreateMemberRequestMutationMutation,
    CreateMemberRequestMutationMutationVariables
  >;
export const ApproveMemberRequestMutationDocument = gql`
  mutation ApproveMemberRequestMutation($id: Int!) {
    approveMemberRequest(id: $id) {
      id
      group {
        id
        name
      }
      user {
        ...UserAvatarFragment
      }
    }
  }
  ${UserAvatarFragmentFragmentDoc}
`;
export type ApproveMemberRequestMutationMutationFn = Apollo.MutationFunction<
  ApproveMemberRequestMutationMutation,
  ApproveMemberRequestMutationMutationVariables
>;

/**
 * __useApproveMemberRequestMutationMutation__
 *
 * To run a mutation, you first call `useApproveMemberRequestMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveMemberRequestMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveMemberRequestMutationMutation, { data, loading, error }] = useApproveMemberRequestMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApproveMemberRequestMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ApproveMemberRequestMutationMutation,
    ApproveMemberRequestMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ApproveMemberRequestMutationMutation,
    ApproveMemberRequestMutationMutationVariables
  >(ApproveMemberRequestMutationDocument, options);
}
export type ApproveMemberRequestMutationMutationHookResult = ReturnType<
  typeof useApproveMemberRequestMutationMutation
>;
export type ApproveMemberRequestMutationMutationResult =
  Apollo.MutationResult<ApproveMemberRequestMutationMutation>;
export type ApproveMemberRequestMutationMutationOptions =
  Apollo.BaseMutationOptions<
    ApproveMemberRequestMutationMutation,
    ApproveMemberRequestMutationMutationVariables
  >;
export const CancelMemberRequestMutationDocument = gql`
  mutation CancelMemberRequestMutation($id: Int!) {
    cancelMemberRequest(id: $id) {
      id
      name
    }
  }
`;
export type CancelMemberRequestMutationMutationFn = Apollo.MutationFunction<
  CancelMemberRequestMutationMutation,
  CancelMemberRequestMutationMutationVariables
>;

/**
 * __useCancelMemberRequestMutationMutation__
 *
 * To run a mutation, you first call `useCancelMemberRequestMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelMemberRequestMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelMemberRequestMutationMutation, { data, loading, error }] = useCancelMemberRequestMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCancelMemberRequestMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CancelMemberRequestMutationMutation,
    CancelMemberRequestMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CancelMemberRequestMutationMutation,
    CancelMemberRequestMutationMutationVariables
  >(CancelMemberRequestMutationDocument, options);
}
export type CancelMemberRequestMutationMutationHookResult = ReturnType<
  typeof useCancelMemberRequestMutationMutation
>;
export type CancelMemberRequestMutationMutationResult =
  Apollo.MutationResult<CancelMemberRequestMutationMutation>;
export type CancelMemberRequestMutationMutationOptions =
  Apollo.BaseMutationOptions<
    CancelMemberRequestMutationMutation,
    CancelMemberRequestMutationMutationVariables
  >;
export const GroupQueryDocument = gql`
  query GroupQuery($name: String!) {
    group(name: $name) {
      ...GroupProfileFragment
    }
  }
  ${GroupProfileFragmentFragmentDoc}
`;

/**
 * __useGroupQueryQuery__
 *
 * To run a query within a React component, call `useGroupQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupQueryQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGroupQueryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GroupQueryQuery,
    GroupQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GroupQueryQuery, GroupQueryQueryVariables>(
    GroupQueryDocument,
    options
  );
}
export function useGroupQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupQueryQuery,
    GroupQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GroupQueryQuery, GroupQueryQueryVariables>(
    GroupQueryDocument,
    options
  );
}
export type GroupQueryQueryHookResult = ReturnType<typeof useGroupQueryQuery>;
export type GroupQueryLazyQueryHookResult = ReturnType<
  typeof useGroupQueryLazyQuery
>;
export type GroupQueryQueryResult = Apollo.QueryResult<
  GroupQueryQuery,
  GroupQueryQueryVariables
>;
export const GroupsQueryDocument = gql`
  query GroupsQuery {
    groups {
      ...GroupFragment
    }
  }
  ${GroupFragmentFragmentDoc}
`;

/**
 * __useGroupsQueryQuery__
 *
 * To run a query within a React component, call `useGroupsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGroupsQueryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GroupsQueryQuery,
    GroupsQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GroupsQueryQuery, GroupsQueryQueryVariables>(
    GroupsQueryDocument,
    options
  );
}
export function useGroupsQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupsQueryQuery,
    GroupsQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GroupsQueryQuery, GroupsQueryQueryVariables>(
    GroupsQueryDocument,
    options
  );
}
export type GroupsQueryQueryHookResult = ReturnType<typeof useGroupsQueryQuery>;
export type GroupsQueryLazyQueryHookResult = ReturnType<
  typeof useGroupsQueryLazyQuery
>;
export type GroupsQueryQueryResult = Apollo.QueryResult<
  GroupsQueryQuery,
  GroupsQueryQueryVariables
>;
export const MemberRequestQueryDocument = gql`
  query MemberRequestQuery($groupId: Int!) {
    memberRequest(groupId: $groupId) {
      id
      status
    }
  }
`;

/**
 * __useMemberRequestQueryQuery__
 *
 * To run a query within a React component, call `useMemberRequestQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMemberRequestQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberRequestQueryQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useMemberRequestQueryQuery(
  baseOptions: Apollo.QueryHookOptions<
    MemberRequestQueryQuery,
    MemberRequestQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    MemberRequestQueryQuery,
    MemberRequestQueryQueryVariables
  >(MemberRequestQueryDocument, options);
}
export function useMemberRequestQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MemberRequestQueryQuery,
    MemberRequestQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MemberRequestQueryQuery,
    MemberRequestQueryQueryVariables
  >(MemberRequestQueryDocument, options);
}
export type MemberRequestQueryQueryHookResult = ReturnType<
  typeof useMemberRequestQueryQuery
>;
export type MemberRequestQueryLazyQueryHookResult = ReturnType<
  typeof useMemberRequestQueryLazyQuery
>;
export type MemberRequestQueryQueryResult = Apollo.QueryResult<
  MemberRequestQueryQuery,
  MemberRequestQueryQueryVariables
>;
export const MemberRequestsQueryDocument = gql`
  query MemberRequestsQuery($groupId: Int!) {
    memberRequests(groupId: $groupId) {
      id
      status
      user {
        ...UserAvatarFragment
      }
    }
  }
  ${UserAvatarFragmentFragmentDoc}
`;

/**
 * __useMemberRequestsQueryQuery__
 *
 * To run a query within a React component, call `useMemberRequestsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMemberRequestsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberRequestsQueryQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useMemberRequestsQueryQuery(
  baseOptions: Apollo.QueryHookOptions<
    MemberRequestsQueryQuery,
    MemberRequestsQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    MemberRequestsQueryQuery,
    MemberRequestsQueryQueryVariables
  >(MemberRequestsQueryDocument, options);
}
export function useMemberRequestsQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MemberRequestsQueryQuery,
    MemberRequestsQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MemberRequestsQueryQuery,
    MemberRequestsQueryQueryVariables
  >(MemberRequestsQueryDocument, options);
}
export type MemberRequestsQueryQueryHookResult = ReturnType<
  typeof useMemberRequestsQueryQuery
>;
export type MemberRequestsQueryLazyQueryHookResult = ReturnType<
  typeof useMemberRequestsQueryLazyQuery
>;
export type MemberRequestsQueryQueryResult = Apollo.QueryResult<
  MemberRequestsQueryQuery,
  MemberRequestsQueryQueryVariables
>;
export const DeleteImageMutationDocument = gql`
  mutation DeleteImageMutation($id: Int!) {
    deleteImage(id: $id)
  }
`;
export type DeleteImageMutationMutationFn = Apollo.MutationFunction<
  DeleteImageMutationMutation,
  DeleteImageMutationMutationVariables
>;

/**
 * __useDeleteImageMutationMutation__
 *
 * To run a mutation, you first call `useDeleteImageMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteImageMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteImageMutationMutation, { data, loading, error }] = useDeleteImageMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteImageMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteImageMutationMutation,
    DeleteImageMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteImageMutationMutation,
    DeleteImageMutationMutationVariables
  >(DeleteImageMutationDocument, options);
}
export type DeleteImageMutationMutationHookResult = ReturnType<
  typeof useDeleteImageMutationMutation
>;
export type DeleteImageMutationMutationResult =
  Apollo.MutationResult<DeleteImageMutationMutation>;
export type DeleteImageMutationMutationOptions = Apollo.BaseMutationOptions<
  DeleteImageMutationMutation,
  DeleteImageMutationMutationVariables
>;
export const CreatePostMutationDocument = gql`
  mutation CreatePostMutation($postData: PostInput!) {
    createPost(postData: $postData) {
      ...PostMutationFragment
    }
  }
  ${PostMutationFragmentFragmentDoc}
`;
export type CreatePostMutationMutationFn = Apollo.MutationFunction<
  CreatePostMutationMutation,
  CreatePostMutationMutationVariables
>;

/**
 * __useCreatePostMutationMutation__
 *
 * To run a mutation, you first call `useCreatePostMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutationMutation, { data, loading, error }] = useCreatePostMutationMutation({
 *   variables: {
 *      postData: // value for 'postData'
 *   },
 * });
 */
export function useCreatePostMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePostMutationMutation,
    CreatePostMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreatePostMutationMutation,
    CreatePostMutationMutationVariables
  >(CreatePostMutationDocument, options);
}
export type CreatePostMutationMutationHookResult = ReturnType<
  typeof useCreatePostMutationMutation
>;
export type CreatePostMutationMutationResult =
  Apollo.MutationResult<CreatePostMutationMutation>;
export type CreatePostMutationMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutationMutation,
  CreatePostMutationMutationVariables
>;
export const UpdatePostMutationDocument = gql`
  mutation UpdatePostMutation($id: Int!, $postData: PostInput!) {
    updatePost(id: $id, postData: $postData) {
      ...PostMutationFragment
    }
  }
  ${PostMutationFragmentFragmentDoc}
`;
export type UpdatePostMutationMutationFn = Apollo.MutationFunction<
  UpdatePostMutationMutation,
  UpdatePostMutationMutationVariables
>;

/**
 * __useUpdatePostMutationMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutationMutation, { data, loading, error }] = useUpdatePostMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      postData: // value for 'postData'
 *   },
 * });
 */
export function useUpdatePostMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePostMutationMutation,
    UpdatePostMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdatePostMutationMutation,
    UpdatePostMutationMutationVariables
  >(UpdatePostMutationDocument, options);
}
export type UpdatePostMutationMutationHookResult = ReturnType<
  typeof useUpdatePostMutationMutation
>;
export type UpdatePostMutationMutationResult =
  Apollo.MutationResult<UpdatePostMutationMutation>;
export type UpdatePostMutationMutationOptions = Apollo.BaseMutationOptions<
  UpdatePostMutationMutation,
  UpdatePostMutationMutationVariables
>;
export const DeletePostMutationDocument = gql`
  mutation DeletePostMutation($id: Int!) {
    deletePost(id: $id)
  }
`;
export type DeletePostMutationMutationFn = Apollo.MutationFunction<
  DeletePostMutationMutation,
  DeletePostMutationMutationVariables
>;

/**
 * __useDeletePostMutationMutation__
 *
 * To run a mutation, you first call `useDeletePostMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutationMutation, { data, loading, error }] = useDeletePostMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePostMutationMutation,
    DeletePostMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeletePostMutationMutation,
    DeletePostMutationMutationVariables
  >(DeletePostMutationDocument, options);
}
export type DeletePostMutationMutationHookResult = ReturnType<
  typeof useDeletePostMutationMutation
>;
export type DeletePostMutationMutationResult =
  Apollo.MutationResult<DeletePostMutationMutation>;
export type DeletePostMutationMutationOptions = Apollo.BaseMutationOptions<
  DeletePostMutationMutation,
  DeletePostMutationMutationVariables
>;
export const PostsQueryDocument = gql`
  query PostsQuery {
    posts {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`;

/**
 * __usePostsQueryQuery__
 *
 * To run a query within a React component, call `usePostsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQueryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PostsQueryQuery,
    PostsQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostsQueryQuery, PostsQueryQueryVariables>(
    PostsQueryDocument,
    options
  );
}
export function usePostsQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PostsQueryQuery,
    PostsQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostsQueryQuery, PostsQueryQueryVariables>(
    PostsQueryDocument,
    options
  );
}
export type PostsQueryQueryHookResult = ReturnType<typeof usePostsQueryQuery>;
export type PostsQueryLazyQueryHookResult = ReturnType<
  typeof usePostsQueryLazyQuery
>;
export type PostsQueryQueryResult = Apollo.QueryResult<
  PostsQueryQuery,
  PostsQueryQueryVariables
>;
export const PostQueryDocument = gql`
  query PostQuery($id: Int!) {
    post(id: $id) {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`;

/**
 * __usePostQueryQuery__
 *
 * To run a query within a React component, call `usePostQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQueryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQueryQuery(
  baseOptions: Apollo.QueryHookOptions<PostQueryQuery, PostQueryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostQueryQuery, PostQueryQueryVariables>(
    PostQueryDocument,
    options
  );
}
export function usePostQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PostQueryQuery,
    PostQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostQueryQuery, PostQueryQueryVariables>(
    PostQueryDocument,
    options
  );
}
export type PostQueryQueryHookResult = ReturnType<typeof usePostQueryQuery>;
export type PostQueryLazyQueryHookResult = ReturnType<
  typeof usePostQueryLazyQuery
>;
export type PostQueryQueryResult = Apollo.QueryResult<
  PostQueryQuery,
  PostQueryQueryVariables
>;
export const UpdateUserMutationDocument = gql`
  mutation UpdateUserMutation($userData: UserInput!) {
    updateUser(userData: $userData) {
      ...UserMutationFragment
    }
  }
  ${UserMutationFragmentFragmentDoc}
`;
export type UpdateUserMutationMutationFn = Apollo.MutationFunction<
  UpdateUserMutationMutation,
  UpdateUserMutationMutationVariables
>;

/**
 * __useUpdateUserMutationMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutationMutation, { data, loading, error }] = useUpdateUserMutationMutation({
 *   variables: {
 *      userData: // value for 'userData'
 *   },
 * });
 */
export function useUpdateUserMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutationMutation,
    UpdateUserMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateUserMutationMutation,
    UpdateUserMutationMutationVariables
  >(UpdateUserMutationDocument, options);
}
export type UpdateUserMutationMutationHookResult = ReturnType<
  typeof useUpdateUserMutationMutation
>;
export type UpdateUserMutationMutationResult =
  Apollo.MutationResult<UpdateUserMutationMutation>;
export type UpdateUserMutationMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutationMutation,
  UpdateUserMutationMutationVariables
>;
export const MeQueryDocument = gql`
  query MeQuery {
    me {
      ...UserProfileLiteFragment
    }
  }
  ${UserProfileLiteFragmentFragmentDoc}
`;

/**
 * __useMeQueryQuery__
 *
 * To run a query within a React component, call `useMeQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQueryQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQueryQuery, MeQueryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQueryQuery, MeQueryQueryVariables>(
    MeQueryDocument,
    options
  );
}
export function useMeQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQueryQuery, MeQueryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQueryQuery, MeQueryQueryVariables>(
    MeQueryDocument,
    options
  );
}
export type MeQueryQueryHookResult = ReturnType<typeof useMeQueryQuery>;
export type MeQueryLazyQueryHookResult = ReturnType<typeof useMeQueryLazyQuery>;
export type MeQueryQueryResult = Apollo.QueryResult<
  MeQueryQuery,
  MeQueryQueryVariables
>;
export const UserQueryDocument = gql`
  query UserQuery($name: String) {
    user(name: $name) {
      ...UserProfileFragment
    }
  }
  ${UserProfileFragmentFragmentDoc}
`;

/**
 * __useUserQueryQuery__
 *
 * To run a query within a React component, call `useUserQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQueryQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUserQueryQuery(
  baseOptions?: Apollo.QueryHookOptions<UserQueryQuery, UserQueryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQueryQuery, UserQueryQueryVariables>(
    UserQueryDocument,
    options
  );
}
export function useUserQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserQueryQuery,
    UserQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQueryQuery, UserQueryQueryVariables>(
    UserQueryDocument,
    options
  );
}
export type UserQueryQueryHookResult = ReturnType<typeof useUserQueryQuery>;
export type UserQueryLazyQueryHookResult = ReturnType<
  typeof useUserQueryLazyQuery
>;
export type UserQueryQueryResult = Apollo.QueryResult<
  UserQueryQuery,
  UserQueryQueryVariables
>;
export const UsersQueryDocument = gql`
  query UsersQuery {
    users {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;

/**
 * __useUsersQueryQuery__
 *
 * To run a query within a React component, call `useUsersQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQueryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UsersQueryQuery,
    UsersQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQueryQuery, UsersQueryQueryVariables>(
    UsersQueryDocument,
    options
  );
}
export function useUsersQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UsersQueryQuery,
    UsersQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQueryQuery, UsersQueryQueryVariables>(
    UsersQueryDocument,
    options
  );
}
export type UsersQueryQueryHookResult = ReturnType<typeof useUsersQueryQuery>;
export type UsersQueryLazyQueryHookResult = ReturnType<
  typeof useUsersQueryLazyQuery
>;
export type UsersQueryQueryResult = Apollo.QueryResult<
  UsersQueryQuery,
  UsersQueryQueryVariables
>;
