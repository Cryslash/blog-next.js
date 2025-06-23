import { userRepository } from '@/repositories/user';
import { cache } from 'react';

export const findAllUsers = cache(async () => await userRepository.findAll());

export const findUserByName = cache(
  async (name: string) =>
    await userRepository.findByName(name).catch(() => undefined),
);

export const findUserById = cache(
  async (id: number) =>
    await userRepository.findById(id).catch(() => undefined),
);
