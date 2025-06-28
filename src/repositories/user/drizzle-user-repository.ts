import { UserModel } from '@/models/user/user-model';
import { UserRepository } from './user-repository';
import { drizzleDb } from '@/db/drizzle';
import { hashPassword, returnCurrentUser } from '@/lib/login/manage-login';
import { usersTable } from '@/db/drizzle/schemas';
import { eq } from 'drizzle-orm';

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

  async update(userName: string, newPassword: string): Promise<UserModel> {
    const user = await drizzleDb.query.users.findFirst({
      where: (user, { eq }) => eq(user.name, userName),
    });

    if (!user) {
      throw new Error('Usuário não encontrado na base de dados');
    }

    const result = await returnCurrentUser().catch(() => undefined);
    if (!result) {
      throw new Error('Faça login novamente');
    }

    if (result.username != userName) {
      throw new Error(
        'Ação bloqueada! Se você acha que isso é um erro contate um administrador... ',
      );
    }

    const hashedPassword = await hashPassword(newPassword);

    const newUserData = { password: hashedPassword };

    await drizzleDb
      .update(usersTable)
      .set(newUserData)
      .where(eq(usersTable.name, userName));

    return {
      ...user,
      ...newUserData,
    };
  }

  async delete(id: number): Promise<UserModel> {
    const user = await drizzleDb.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });

    if (!user) {
      throw new Error('Usuário não existe na base de dados');
    }

    const newUserData = { isActive: false };

    await drizzleDb
      .update(usersTable)
      .set(newUserData)
      .where(eq(usersTable.id, id));

    return {
      ...user,
      ...newUserData,
    };
  }
}
