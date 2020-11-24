import client from "../../client";
//import { authenticate } from "../../components/auth/authentication";
import {
  getbundleQuery,
  deleteBundleMutation,
  addBundleMutation,
  updateBundleMutation,
  
} from "../../queries/queries";
import {
  GET_BUNDLES_LIST_START,
  GET_BUNDLES_LIST_FAIL,
  GET_BUNDLES_LIST_SUCCESS,
  DELETE_BUNDLE_START,
  DELETE_BUNDLE_FAIL,
  DELETE_BUNDLE_SUCCESS,
  INSERT_BUNDLE_FAIL,
  INSERT_BUNDLE_START,
  INSERT_BUNDLE_SUCCESS,
  UPDATE_BUNDLE_FAIL,
  UPDATE_BUNDLE_START,
  UPDATE_BUNDLE_SUCCESS,
  SELECT_BUNDLE,
  
  
} from "./actionType";

const fetchBundlesStart = {
  type: GET_BUNDLES_LIST_START,
};

const fetchBundlesFail = {
  type: GET_BUNDLES_LIST_FAIL,
};

const fetchBundlesSuccess = (bundleList) => {
  return {
    type: GET_BUNDLES_LIST_SUCCESS,
    bundleList,
  };
};

export const fetchBundles = () => {
  return async (dispatch) => {
    
    dispatch(fetchBundlesStart);

    const { data } = await client.query({
      query: getbundleQuery,
    });

    if (data.error) {
      dispatch(fetchBundlesFail);
    } else {
      dispatch(fetchBundlesSuccess(data.getBundle));
    }
  };
};



const deleteBundleStart = {
  type: DELETE_BUNDLE_START,
};

const deleteBundleFail = {
  type: DELETE_BUNDLE_FAIL,
};

const deleteBundleSuccess = (bundleId) => {
  return {
    type: DELETE_BUNDLE_SUCCESS,
    bundleId,
  };
};

export const deleteBundle = (bundleId) => {
  return async (dispatch) => {
    dispatch(deleteBundleStart);

    const { data } = await client.mutate({
      mutation: deleteBundleMutation,
      variables: { id: bundleId },
    });

    if (data.error) {
      dispatch(deleteBundleFail);
    } else {
      dispatch(deleteBundleSuccess(bundleId));
    }
  };
};

const fetchBundleUpdateStart = {
  type: UPDATE_BUNDLE_START,
};

const fetchBundleUpdateFail = {
  type: UPDATE_BUNDLE_FAIL,
};

const fetchBundleUpdateSuccess = (selectedBundle) => {
  return {
    type: UPDATE_BUNDLE_SUCCESS,
    selectedBundle,
  };
};

export const fetchBundleUpdateId = ({ id, name }) => {
  return async (dispatch) => {
   
    dispatch(fetchBundleUpdateStart);

    const { data } = await client.mutate({
      mutation:updateBundleMutation,
      variables: { id, name },
    });

    if (data.error) {
      dispatch(fetchBundleUpdateFail);
    } else {
      dispatch(fetchBundleUpdateSuccess(data.updateBundle));
     
     
    }
  };
};

export const setSelectedBundle = (selectedBundle) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_BUNDLE,
      selectedBundle,
    })
  }
};



const insertBundleStart = {
  type: INSERT_BUNDLE_START,
};

const insertBundleFail = {
  type: INSERT_BUNDLE_FAIL,
};

const insertBundleSuccess = (bundleDetails) => {
  return {
    type: INSERT_BUNDLE_SUCCESS,
    bundleDetails,
  };
};

export const InsertBundle = (name) => {
  return async (dispatch) => {
   
    dispatch(insertBundleStart);

    const { data } = await client.mutate({
      mutation: addBundleMutation,
      variables: {name },
    });

    if (data.error) {
      dispatch(insertBundleFail);
    } else {
      
      dispatch(insertBundleSuccess(data.addBundle));
    }
  };
};

