import { GraphQLError } from "graphql";

const fetchAdminApi = async (query, tenantId, Authorization, variables?) => {
  const result = await fetch("https://services.dev.53.skillstery.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-tenant": tenantId,
      Authorization,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  return await result.json();
};

export default {
  Query: {
    products: async (_, _, context) => {
      const a = await fetchAdminApi(
        /* GraphQL */ `
          query GetProductByStudentId {
            students {
              listProductTiersCurrent {
                data {
                  productTier {
                    product {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        `,
        context.request.headers.get("x-tenant"),
        context.request.headers.get("Authorization")
      );
      if (a.message === "jwt expired") {
        throw new GraphQLError("jwt expired", {
          extensions: {
            code: "JWT_EXPIRED",
          },
        });
      }
      if (a.message === "You don't have permission") {
        throw new GraphQLError("You don't have permission", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }
      return a.data.students.listProductTiersCurrent.data.map(
        (item) => item.productTier.product
      );
    },
  },
};
