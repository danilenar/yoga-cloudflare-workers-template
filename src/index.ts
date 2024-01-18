import { createYoga, createSchema, useExtendContext } from "graphql-yoga";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { fetchAdminApi } from "./helpers";
const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  graphiql: {
    defaultQuery: `
      {
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
  plugins: [
    useExtendContext(async (context) => {
      return {
        fetchAdminApi: fetchAdminApi(
          context.request.headers.get("x-tenant"),
          context.request.headers.get("x-studentId")
        ),
      };
    }),
  ],
});

self.addEventListener("fetch", yoga);
