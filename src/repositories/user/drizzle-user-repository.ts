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
      orderBy: (users, { desc }) => desc(users.id),
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
      // where: (user, { and }) =>
      // and(eq(user.name, name), eq(user.isActive, true)),
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

  async create(
    userName: string,
    password: string,
    isAdmin: boolean,
  ): Promise<UserModel> {
    if (!userName || userName == '') {
      throw new Error('Um nome de usuário deve ser informado');
    }
    if (!password || password == '') {
      throw new Error('Uma senha deve ser informada');
    }
    const hashedPassword = await hashPassword(password);
    const userType = isAdmin ? 'admin' : 'author';
    const userData: UserModel = {
      name: userName,
      password: hashedPassword,
      userType: userType,
      isActive: true,
    };
    await drizzleDb.insert(usersTable).values(userData);
    return userData;
  }
}
