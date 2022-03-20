/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      email
      phone
      role
      isPlanActive
      firstName
      lastName
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      email
      phone
      role
      isPlanActive
      firstName
      lastName
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      email
      phone
      role
      isPlanActive
      firstName
      lastName
      id
      createdAt
      updatedAt
    }
  }
`;
