import { gql } from "@apollo/client";
import { IMAGE_SUMMARY } from "../images/fragments";
import {
  USER_PROFILE_LITE_SUMMARY,
  USER_PROFILE_SUMMARY,
  USER_SUMMARY,
} from "./fragments";

export const ME_QUERY = gql`
  query MeQuery {
    me {
      ...UserProfileLiteSummary
    }
  }
  ${USER_PROFILE_LITE_SUMMARY}
`;

export const USERS_QUERY = gql`
  query UsersQuery {
    users {
      ...UserSummary
    }
  }
  ${USER_SUMMARY}
`;

export const USER_QUERY = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      ...UserProfileSummary
    }
  }
  ${USER_PROFILE_SUMMARY}
`;

export const USER_BY_NAME_QUERY = gql`
  query UserByNameQuery($name: String!) {
    userByName(name: $name) {
      ...UserProfileSummary
    }
  }
  ${USER_PROFILE_SUMMARY}
`;

export const COVER_PHOTO_QUERY = gql`
  query CoverPhotoQuery($id: ID!) {
    coverPhoto(id: $id) {
      ...ImageSummary
    }
  }
  ${IMAGE_SUMMARY}
`;

export const MY_PROFILE_PICTURE_QUERY = gql`
  query MyProfilePictureQuery {
    myProfilePicture {
      ...ImageSummary
    }
  }
  ${IMAGE_SUMMARY}
`;

export const PROFILE_PICTURE_QUERY = gql`
  query ProfilePictureQuery($id: ID!) {
    profilePicture(id: $id) {
      ...ImageSummary
    }
  }
  ${IMAGE_SUMMARY}
`;
