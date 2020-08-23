import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),       // path to the folder with migrations, absolute
    pattern: /^[\w-]+\d+\.[tj]s$/,                    // regex pattern for the migration files
  },
  entities: [Post],
  dbName: 'fsreddit',
  type: 'postgresql',
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0]; // returns the type that MikroORM.init expects


// If you cast it as const:
// const obj = {
//   entities: [Post],
//   dbName: 'fsreddit',
//   type: 'postgresql',
//   debug: !__prod__,
// } as const;

// obj.dbName  // type fsreddit
// obj.type    // type postgresql