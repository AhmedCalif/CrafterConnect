export interface CreatePostsInput {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date
  likesCount: Likes[]
}

export interface Likes {
  id: string;
  postId: string
  userId: string
  createdAt: Date;
}


export interface UpdatePostsInput {
  id: string;
  content: string;
  authorId: string;
  updatedAt: Date;
  likesCount: Likes[]
}

