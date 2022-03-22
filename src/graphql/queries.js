/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($productId: ID!) {
    getProduct(productId: $productId) {
      productId
      title
      createdAt
      updatedAt
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
        createdAt
        updatedAt
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
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($userId: ID!, $createdAt: String!) {
    getUser(userId: $userId, createdAt: $createdAt) {
      userId
      email
      createdAt
      updatedAt
      role
      isPlanActive
      phone
      firstName
      lastName
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $userId: ID
    $createdAt: ModelStringKeyConditionInput
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      userId: $userId
      createdAt: $createdAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        email
        createdAt
        updatedAt
        role
        isPlanActive
        phone
        firstName
        lastName
      }
      nextToken
    }
  }
`;
export const productByTitle = /* GraphQL */ `
  query ProductByTitle(
    $title: String!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productByTitle(
      title: $title
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        productId
        title
        createdAt
        updatedAt
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
      }
      nextToken
    }
  }
`;
export const userByEmail = /* GraphQL */ `
  query UserByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userId
        email
        createdAt
        updatedAt
        role
        isPlanActive
        phone
        firstName
        lastName
      }
      nextToken
    }
  }
`;
