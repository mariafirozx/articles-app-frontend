export interface Article {
  id: number;
  title: string;
  content: string;
  description: string;
  status: 'DRAFT' | 'PUBLISHED';
  authorId: number;
  authorUsername: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleRequest {
  title: string;
  content: string;
  description: string;
}
