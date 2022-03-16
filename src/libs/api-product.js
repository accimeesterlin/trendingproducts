import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@Graphql/mutations";
import * as queries from "@Graphql/queries";

export const listProducts = () =>
  API.graphql(graphqlOperation(queries.listProducts));

export const createProduct = async (product) =>
  API.graphql(
    graphqlOperation(mutations.createProduct, {
      input: product,
    })
  );

export const deleteProduct = (productId) =>
  API.graphql(
    graphqlOperation(mutations.deleteProduct, {
      input: {
        productId,
      },
    })
  );

export const getProduct = (productId) =>
  API.graphql(
    graphqlOperation(queries.getProduct, {
      productId,
    })
  );

export const updateProduct = (product, productId) =>
  API.graphql(
    graphqlOperation(mutations.updateProduct, {
      input: {
        ...product,
        updatedByField: productId,
      },
    })
  );
