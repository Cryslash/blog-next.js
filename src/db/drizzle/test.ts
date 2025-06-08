import { drizzleBd } from '.';
import { postsTable } from './schemas';

(async () => {
  const posts = await drizzleBd.select().from(postsTable);

  console.log(posts);
})();
