import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@Graphql/mutations";
import * as queries from "@Graphql/queries";

export const listProducts = (nextToken, filter) => {
  const params = {
    limit: 10,
    // sortDirection: "createdAt",
  };

  if (nextToken) {
    params.nextToken = nextToken;
  }

  if (filter) {
    params.filter = filter;
  }

  return API.graphql(graphqlOperation(queries.listProducts, params));
};

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

export const getProductByTitle = (title) =>
  API.graphql(
    graphqlOperation(queries.productByTitle, {
      title,
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
