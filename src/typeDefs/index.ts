export default /* GraphQL */ `
  type Product {
    id: ID!
    name: String!
    image: String!
  }
  type Query {
    products: [Product]
  }
`;
