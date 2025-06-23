import { UserModel } from '@/models/user/user-model';
import { UserRepository } from './user-repository';
import { drizzleDb } from '@/db/drizzle';

export class DrizzleUserRepository implements UserRepository {
  async findAll(): Promise<UserModel[]> {
    const users = await drizzleDb.query.users.findMany({
      where: (users, { eq }) => eq(users.isActive, true),
    });

    return users;
  }

  async findById(id: number): Promise<UserModel> {
    const user = await drizzleDb.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });

    if (!user) throw new Error('Id de usuario não encontrado');

    return user;
  }

  async findByName(name: string): Promise<UserModel> {
    const user = await drizzleDb.query.users.findFirst({
      where: (user, { eq }) => eq(user.name, name),
    });

    if (!user) throw new Error('Nome de usuario não encontrado');

    return user;
  }
}
