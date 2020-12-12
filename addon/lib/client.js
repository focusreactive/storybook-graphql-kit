const { GraphQLClient } = require('graphql-request');

const createClient = ({ endpoint, token }) =>
  new GraphQLClient(endpoint, {
    headers: token
      ? {
          authorization: `Bearer ${token}`,
        }
      : {},
  });

export const request = async ({ endpoint, token, query, vars }) => {
  const client = createClient({ endpoint, token });
  const data = await client.request(query, vars);
  return data;
};
