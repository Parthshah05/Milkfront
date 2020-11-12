import client from "../../client";
//import { authenticate } from "../../components/auth/authentication";
import {
  getbundleQuery,
  deleteBundleMutation,
  addBundleMutation,
  
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

