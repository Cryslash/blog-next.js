import { UserModel } from '@/models/user/user-model';

export interface UserRepository {
  findAll(): Promise<UserModel[]>;
  findById(id: number): Promise<UserModel>;
  findByName(name: string): Promise<UserModel>;

  //mutations
  update(userName: string, newPassword: string): Promise<UserModel>;
}
