export interface IComment {
  id: number;
  productId?: number;
  userId: number;
  reviewId?: number;
  postId?: number;
  commentText: string;
  createdAt: Date;
}
