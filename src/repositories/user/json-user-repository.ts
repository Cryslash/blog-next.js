import { UserModel } from '@/models/user/user-model';
import { UserRepository } from './user-repository';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

const ROOT_DIR = process.cwd();
const JSON_USERS_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'users.json',
);

export class JsonUserRepository implements UserRepository {
  private async readFromDisk(): Promise<UserModel[]> {
    const jsonContent = await readFile(JSON_USERS_FILE_PATH, 'utf-8');
    const parsedJson = JSON.parse(jsonContent);
    const { users } = parsedJson;
    return users;
  }

  async findAll(): Promise<UserModel[]> {
    const users = await this.readFromDisk();
    return users;
  }

  async findById(id: number): Promise<UserModel> {
    const users = await this.readFromDisk();
    const user = users.find(user => user.id === id);

    if (!user) throw new Error('Id de usuário não encontrado.');

    return user;
  }
  async findByName(name: string): Promise<UserModel> {
    const users = await this.readFromDisk();
    const user = users.find(user => user.name === name);

    if (!user) throw new Error('Nome de usuário não encontrado.');

    return user;
  }
}
