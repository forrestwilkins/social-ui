export interface ImageEntity {
  id: number;
  filename: string;
  imageType?: string;
  postId?: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MyProfilePictureQuery {
  myProfilePicture: ImageEntity;
}
