export interface Comment {
  id: number;
  text: string;
  articleId: number;
  authorId: number;
  authorUsername: string;
  createdAt: string;
}

export interface CommentRequest {
  text: string;
  articleId: number;
}