import { JsonUserRepository } from '@/repositories/user/json-user-repository';
import { drizzleDb } from '.';
import { usersTable } from './schemas';
import { asc } from 'drizzle-orm';

(async () => {
  const jsonUserRepository = new JsonUserRepository();
  const users = await jsonUserRepository.findAll();

  try {
    await drizzleDb.delete(usersTable).run();
    await drizzleDb.insert(usersTable).values(users);

    console.log(`${users.length} users foram salvos na database.`);
    const allUsers = await drizzleDb
      .select()
      .from(usersTable)
      .orderBy(asc(usersTable.id));
    console.log('Usuários cadastrados:');
    console.table(allUsers);
  } catch (e) {
    console.log('ocorreu um erro: ', e);
  }
})();
