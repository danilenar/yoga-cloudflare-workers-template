import { GraphQLError } from "graphql";
import { fetchAdminApi } from "../../helpers";
import { YogaInitialContext } from "graphql-yoga";

interface AdminApiResponse {
  message?: string;
  data?: {
    students: {
      listProductTiersCurrent: {
        data: Array<{
          productTier: {
            product: {
              id: string;
              name: string;
            };
          };
        }>;
      };
    };
  };
}

export const productsQuery = async (
  _: unknown,
  args: unknown,
  context: YogaInitialContext
) => {
  const apiResponse: AdminApiResponse = await fetchAdminApi(
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
    context.request.headers.get("x-tenant") ?? "",
    context.request.headers.get("x-studentId") ?? ""
  );

  if (apiResponse.message === "jwt expired") {
    throw new GraphQLError("JWT expired", {
      extensions: {
        code: "JWT_EXPIRED",
      },
    });
  }

  if (apiResponse.message === "You don't have permission") {
    throw new GraphQLError("Access denied: You don't have permission", {
      extensions: {
        code: "UNAUTHORIZED",
      },
    });
  }

  return (
    apiResponse.data?.students.listProductTiersCurrent.data.map(
      (tier) => tier.productTier.product
    ) || []
  );
};
