import { gql } from "apollo-boost";

const userloginMutation = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      email
      token
      role
    }
  }
`;

const adduserMutation = gql`
  mutation addUser(
    $name: String
    $email: String
    $password: String
    $role_id: Int
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
      role_id: $role_id
    ) {
      name
      email
      token
    }
  }
`;

const updateuserMutation = gql`
  mutation updateUser(
    $name: String
    $email: String
    $password: String
    $id: Int
  ) {
    updateUser(
      name: $name
      email: $email
      password: $password
      id: $id
    ) {
      name
      email
      password
      id
    }
  }
`;

const getroleQuery = gql`
  {
    getRole {
      name
      id
    }
  }
`;

const addProductMutation = gql`
  mutation addProduct(
    $name: String
    $description: String
    $image: String
    $price: Int
  ) {
    addProduct(
      name: $name
      description: $description
      image: $image
      price: $price
    ) {
      name
      price
    }
  }
`;

const addBundleMutation = gql`
  mutation addBundle($name: String) {
    addBundle(name: $name) {
      name
    }
  }
`;

const addRoleMutation = gql`
  mutation addRole($name: String) {
    addRole(name: $name) {
      name
    }
  }
`;

const deleteUserMutation = gql`
  mutation deleteUser($id: Int) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const deleteProductMutation = gql`
  mutation deleteProduct($id: Int) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const deleteBundleMutation = gql`
  mutation deleteBundle($id: Int) {
    deleteBundle(id: $id) {
      id
    }
  }
`;
const deleteBundle_ProductMutation = gql`
  mutation deleteBundle_Product($id: Int) {
    deleteBundle_Product(id: $id) {
      id
    }
  }
`;

const getUserByIdMutation = (userId) => gql`
{
  getUser(id: ${userId}) {
      id
      name
      email
      token
      role {
        name
      }
    }
  }
`;

const getProductByIdMutation = (productId) => gql`
{
  getProduct(id: ${productId}) {
      id
      name
      description
      price
      image
    }
  }
`;

const addBundle_ProductMutation = gql`
  mutation addBundle_Product($product_id: Int, $bundle_id: Int) {
    addBundle_Product(product_id: $product_id, bundle_id: $bundle_id) {
      product_id
    }
  }
`;

const getproductQuery = gql`
  {
    getProduct {
      id
      name
      description
      image
      price
    }
  }
`;

const getbundleQuery = gql`
  {
    getBundle {
      name
      id
    }
  }
`;
const getuserQuery = gql`
  {
    getUser {
      id
      name
      email
      password
      role {
        name
      }
    }
  }
`;

const getbundle_productQuery = gql`
  {
    getBundle_Product {
      id
      product {
        name
        price
      }
      bundle {
        name
      }
    }
  }
`;

export {
  userloginMutation,
  adduserMutation,
  deleteProductMutation,
  getUserByIdMutation,
  getProductByIdMutation,
  getroleQuery,
  updateuserMutation,
  getbundle_productQuery,
  deleteUserMutation,
  addProductMutation,
  addRoleMutation,
  deleteBundleMutation,
  addBundleMutation,
  deleteBundle_ProductMutation,
  addBundle_ProductMutation,
  getproductQuery,
  getbundleQuery,
  getuserQuery,
};
