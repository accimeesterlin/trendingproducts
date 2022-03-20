import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@Graphql/mutations";
import * as queries from "@Graphql/queries";

export const listUsers = () => API.graphql(graphqlOperation(queries.listUsers));

export const createUser = async (product) =>
  API.graphql(
    graphqlOperation(mutations.createUser, {
      input: product,
    })
  );

export const deleteUser = (userId) =>
  API.graphql(
    graphqlOperation(mutations.deleteUser, {
      input: {
        userId,
      },
    })
  );

export const getUser = (userId) =>
  API.graphql(
    graphqlOperation(queries.getUser, {
      userId,
    })
  );

export const getUserByEmail = (email) =>
  API.graphql(
    graphqlOperation(queries.userByEmail, {
      email,
      limit: 1,
    })
  );

export const updateUser = (user, userId) =>
  API.graphql(
    graphqlOperation(mutations.updateUser, {
      input: {
        ...user,
        updatedByField: userId,
      },
    })
  );
