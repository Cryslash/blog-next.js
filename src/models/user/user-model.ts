export type UserModel = {
  id?: number;
  name: string;
  password: string;
  userType: 'author' | 'admin';
  isActive: boolean;
};
