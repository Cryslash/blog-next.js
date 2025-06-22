import { hashPassword } from '@/lib/login/manage-login';

(async () => {
  const minhaSenha = ''; //dont forget to delete the password from here
  const hashBased64 = await hashPassword(minhaSenha);

  console.log({ hashBased64 });
})();
