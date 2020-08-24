import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  // console.log("dirname: ", __dirname);
  const orm = await MikroORM.init(mikroConfig); // Connect to DB
  orm.getMigrator().up();                       // Automatically run migrations

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false
    }),
    context: () => ({ em: orm.em }) // context is a special object accessible by all resolvers
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server started at port 4000')
  });


  // Insert
  // const post = orm.em.create(Post, {title: 'Hello there'});
  // await orm.em.persistAndFlush(post);
  // Find
  // const posts = await orm.em.find(Post, {});
  // console.log(posts);
}

main();

console.log("hello there");