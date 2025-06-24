import { PostModel } from '@/models/post/post-model';

export interface PostRepository {
  findAllPublic(): Promise<PostModel[]>;
  findAll(): Promise<PostModel[]>;
  findAllByAuthor(author: string): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;
  findBySlugPublic(slug: string): Promise<PostModel>;

  //Mutation
  create(post: PostModel): Promise<PostModel>;
  delete(id: string, username: string, usertype: string): Promise<PostModel>;
  update(
    id: string,
    username: string,
    usertype: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel>;
}
