import { createYoga, createSchema } from "graphql-yoga";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
});

self.addEventListener("fetch", yoga);
