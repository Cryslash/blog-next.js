import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/db/drizzle';
import { AsyncDelay } from '@/utils/async-delay';
import { postsTable } from '@/db/drizzle/schemas';
import { eq } from 'drizzle-orm';

const simulateWaitMs = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await AsyncDelay(simulateWaitMs, true);

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findAllByAuthor(author: string): Promise<PostModel[]> {
    await AsyncDelay(simulateWaitMs, true);

    const posts = await drizzleDb.query.posts.findMany({
      where: (posts, { eq }) => eq(posts.author, author),
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    if (!posts) throw new Error('Não há posts para o autor logado no momento');

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await AsyncDelay(simulateWaitMs, true);

    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.published, true), eq(post.slug, slug)),
    });

    if (!post) throw new Error('Post não encontrado para Slug');
    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await AsyncDelay(simulateWaitMs, true);

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await AsyncDelay(simulateWaitMs, true);

    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    });

    if (!post) throw new Error('Post não encontrado para ID');

    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!!postExists) {
      throw new Error('Post com ID ou Slug já existe na base de dados');
    }

    await drizzleDb.insert(postsTable).values(post);
    return post;
  }

  async delete(
    id: string,
    username: string,
    usertype: string,
  ): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new Error('Post não existe');
    }

    const isAuthor = post.author === username;
    const isAdmin = usertype === 'admin';

    const isAuthorized = isAdmin || isAuthor;

    if (!isAuthorized) {
      throw new Error('Você não tem autorização para realizar a ação');
    }

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

    return post;
  }

  async update(
    id: string,
    username: string,
    usertype: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!oldPost) {
      throw new Error('Post não existe');
    }

    const isAdmin = usertype === 'admin';
    const isAuthor = username === oldPost.author;
    const isAuthorized = isAdmin || isAuthor;

    if (!isAuthorized) {
      throw new Error('Você não tem autorização para realizar a ação');
    }

    const updatedAt = new Date().toISOString();
    const postData = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt,
    };
    await drizzleDb
      .update(postsTable)
      .set(postData)
      .where(eq(postsTable.id, id));

    return {
      ...oldPost,
      ...postData,
    };
  }
}
