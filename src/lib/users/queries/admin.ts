import { userRepository } from '@/repositories/user';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

export const findAllUsers = cache(
  unstable_cache(
    async () => {
      return await userRepository.findAll();
    },
    ['users'],
    {
      tags: ['users'],
    },
  ),
);

export const findUserByName = cache(
  async (name: string) =>
    await userRepository.findByName(name).catch(() => undefined),
);

export const findUserById = cache(
  async (id: number) =>
    await userRepository.findById(id).catch(() => undefined),
);
