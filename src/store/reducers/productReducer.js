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
  GET_PRODUCTBYID_LIST_SUCCESS,
  GET_PRODUCTBYID_LIST_START,
  GET_PRODUCTBYID_LIST_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_START,
  SELECT_PRODUCT,
  UPDATE_PRODUCT_FAIL,
} from "../actions/actionType";

const initialState = {
  error: false,
  loading: false,
  processing: false,
  productList: [],
  productDetails: null,
};

export default function Modalreduce(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTBYID_LIST_START:
      return {
        ...state,
        error: false,
        loading: true,
        selectedProduct: null,
      };
    case GET_PRODUCTBYID_LIST_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
        ProductList: null,
      };
    case GET_PRODUCTBYID_LIST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        selectedProduct: action.selectedProduct,
      };

    case GET_PRODUCTS_LIST_START:
      return {
        ...state,
        error: false,
        loading: true,
        productList: [],
      };
    case GET_PRODUCTS_LIST_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
        productList: [],
      };
    case GET_PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        productList: action.productList,
      };
    case DELETE_PRODUCT_START:
      return {
        ...state,
        processing: true,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        processing: false,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        processing: false,
        productList: [
          ...state.productList.filter(({ id }) => id !== action.productId),
        ],
      };

    case INSERT_PRODUCT_START:
      return {
        ...state,
        error: false,
        loading: true,
        productList: [],
      };
    case INSERT_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        productList: [],
      };
    case INSERT_PRODUCT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        productDetails: action.productDetails,
      };

    case UPDATE_PRODUCT_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case UPDATE_PRODUCT_SUCCESS:
      const productList = state.productList;
      const udpatedIndex = productList.findIndex(
        ({ id }) => action.selectedProduct.id === id
      );

      if (udpatedIndex !== -1) {
        productList[udpatedIndex] = {
          ...productList[udpatedIndex],
          ...action.selectedProduct,
        };
      }

      return {
        ...state,
        error: false,
        loading: false,
        selectedProduct: action.selectedProduct,
        productList,
      };
    case SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.selectedProduct,
      };
    default:
      return state;
  }
}
