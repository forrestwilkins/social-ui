export interface ImageEntity {
  id: number;
  filename: string;
  imageType?: string;
  postId?: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
  __typename: "Image";
}

export interface ProfilePictureQuery {
  profilePicture: ImageEntity;
}

export interface MyProfilePictureQuery {
  myProfilePicture: ImageEntity;
}

export interface CoverPhotoQuery {
  coverPhoto: ImageEntity | null;
}
