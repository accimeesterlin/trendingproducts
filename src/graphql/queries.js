/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($productId: ID!) {
    getProduct(productId: $productId) {
      productId
      title
      description
      productPrice
      sold
      totalReviews
      imageCover
      images
      followers
      storeName
      videoUrl
      positiveFeedBack
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $productId: ID
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProducts(
      productId: $productId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        productId
        title
        description
        productPrice
        sold
        totalReviews
        imageCover
        images
        followers
        storeName
        videoUrl
        positiveFeedBack
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
