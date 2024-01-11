interface GraphQLContext {
  request: {
    headers: {
      get: (name: string) => string | null;
    };
  };
}

/**
 * Fetches data from the admin API.
 *
 * @param query - The GraphQL query.
 * @param tenantId - Tenant identifier.
 * @param authorization - Authorization token.
 * @param variables - Optional GraphQL variables.
 * @returns The JSON response from the API.
 */
export const fetchAdminApi = async (
  query: string,
  tenantId: string,
  authorization: string,
  variables: object = {}
): Promise<Object> => {
  const response = await fetch(
    "https://benko-services.53.skillstery.com/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-tenant": tenantId,
        Authorization: authorization,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  return response.json();
};
