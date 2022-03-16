/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      title
      description
      sold
      totalReviews
      images
      followers
      storeName
      videoUrl
      positiveFeedBack
      id
      createdAt
      updatedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        title
        description
        sold
        totalReviews
        images
        followers
        storeName
        videoUrl
        positiveFeedBack
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
