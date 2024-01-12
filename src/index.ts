import { createYoga, createSchema } from "graphql-yoga";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  graphiql: {
    defaultQuery: `
      query {
        products {
          id
          name
        }
      }
    `,
    headers: `{
      "x-tenant": "<tenant id>",
      "x-studentId": "<idToken from cognito login response>"
    }`,
  },
});

self.addEventListener("fetch", yoga);
