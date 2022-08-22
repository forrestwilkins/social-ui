export interface ImageEntity {
  id: number;
  filename: string;
  postId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MyProfilePictureQuery {
  myProfilePicture: ImageEntity;
}
