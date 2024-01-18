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
export const fetchAdminApi =
  (tenantId: string, authorization: string) =>
  async (query: string, variables: object = {}): Promise<Object> => {
    const response = await fetch(globalThis.ADMIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-tenant": tenantId,
        Authorization: authorization,
      },
      body: JSON.stringify({ query, variables }),
    });

    return response.json();
  };
