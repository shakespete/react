import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
  // console.log("dirname: ", __dirname);
  const orm = await MikroORM.init(mikroConfig); // Connect to DB
  orm.getMigrator().up();                       // Automatically run migrations

  // Insert
  // const post = orm.em.create(Post, {title: 'Hello there'});
  // await orm.em.persistAndFlush(post);

  // Find
  const posts = await orm.em.find(Post, {});
  console.log(posts);
}

main();

console.log("hello there");