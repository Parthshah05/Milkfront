import client from "../../client";
//import { authenticate } from "../../components/auth/authentication";
import {
  getproductQuery,
  deleteProductMutation,
  addProductMutation,
  getProductByIdMutation,
} from "../../queries/queries";
import {
  GET_PRODUCTS_LIST_START,
  GET_PRODUCTS_LIST_FAIL,
  GET_PRODUCTS_LIST_SUCCESS,
  DELETE_PRODUCT_START,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  INSERT_PRODUCT_FAIL,
  INSERT_PRODUCT_START,
  INSERT_PRODUCT_SUCCESS,
  GET_PRODUCTBYID_LIST_START,
  GET_PRODUCTBYID_LIST_FAIL,
  GET_PRODUCTBYID_LIST_SUCCESS,
  
} from "./actionType";

const fetchProductsStart = {
  type: GET_PRODUCTS_LIST_START,
};

const fetchProductsFail = {
  type: GET_PRODUCTS_LIST_FAIL,
};

const fetchProductsSuccess = (productList) => {
  return {
    type: GET_PRODUCTS_LIST_SUCCESS,
    productList,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    
    dispatch(fetchProductsStart);

    const { data } = await client.query({
      query: getproductQuery,
    });

    if (data.error) {
      dispatch(fetchProductsFail);
    } else {
      dispatch(fetchProductsSuccess(data.getProduct));
    }
  };
};

const fetchProductbyIdStart = {
  type: GET_PRODUCTBYID_LIST_START,
};

const fetchProductbyIdFail = {
  type: GET_PRODUCTBYID_LIST_FAIL,
};

const fetchProductbyIdSuccess = (selectedProduct) => {
  return {
    type: GET_PRODUCTBYID_LIST_SUCCESS,
    selectedProduct,
  };
};

export const fetchProductbyId = (productId) => {
  return async (dispatch) => {
    
    dispatch(fetchProductbyIdStart);

    const { data } = await client.query({
      query: getProductByIdMutation(productId),
    });

    if (data.error) {
      dispatch(fetchProductbyIdFail);
    } else {
      dispatch(fetchProductbyIdSuccess(data.getProduct[0]));
    }
  };
};

// const fetchUserUpdateStart = {
//   type: UPDATE_USER_START,
// };

// const fetchUserUpdateFail = {
//   type: UPDATE_USER_FAIL,
// };

// const fetchUserUpdateSuccess = (selectedUser) => {
//   return {
//     type: UPDATE_USER_SUCCESS,
//     selectedUser,
//   };
// };

// export const fetchUserUpdateId = (userId) => {
//   return async (dispatch) => {
    
//     dispatch(fetchUserUpdateStart);

//     const { data } = await client.query({
//       mutation: updateuserMutation,
//       variables: { id: userId },
//     });

//     if (data.error) {
//       dispatch(fetchUserUpdateFail);
//     } else {
//       dispatch(fetchUserUpdateSuccess(data.updateUser));
//     }
//   };
// };


const deleteProductStart = {
  type: DELETE_PRODUCT_START,
};

const deleteProductFail = {
  type: DELETE_PRODUCT_FAIL,
};

const deleteProductSuccess = (productId) => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    productId,
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    dispatch(deleteProductStart);

    const { data } = await client.mutate({
      mutation: deleteProductMutation,
      variables: { id: productId },
    });

    if (data.error) {
      dispatch(deleteProductFail);
    } else {
      dispatch(deleteProductSuccess(productId));
    }
  };
};


const insertProductStart = {
  type: INSERT_PRODUCT_START,
};

const insertProductFail = {
  type: INSERT_PRODUCT_FAIL,
};

const insertProductSuccess = (productDetails) => {
  return {
    type: INSERT_PRODUCT_SUCCESS,
    productDetails,
  };
};

export const InsertProduct = (name,description, price,image) => {
  return async (dispatch) => {
   
    dispatch(insertProductStart);

    const { data } = await client.mutate({
      mutation: addProductMutation,
      variables: {name, description, price, image },
    });

    if (data.error) {
      dispatch(insertProductFail);
    } else {
      
      dispatch(insertProductSuccess(data.addProduct));
    }
  };
};

