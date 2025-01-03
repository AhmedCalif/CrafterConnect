export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  likesCount: number;
  timestamp: Date;
  author: {
    name: string;
    avatar: string;
  };
}

export type CreatePostInput = Omit<Post,  | 'timestamp' | 'author' | 'likesCount'> & {
  id: string;
  authorId: string;
  createdAt: Date
};

export interface UpdatePostInput {
  id: string;
  content: string;
}


export interface Likes {
  id: string;
  postId: string
  userId: string
  createdAt: Date;
}
