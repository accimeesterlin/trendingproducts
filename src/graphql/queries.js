/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($productId: ID!) {
    getProduct(productId: $productId) {
      productId
      title
      description
      productPrice
      productUrl
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
        productUrl
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
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      email
      phone
      role
      id
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        email
        phone
        role
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
