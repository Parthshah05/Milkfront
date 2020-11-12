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
    
  } from "../actions/actionType";
  
  const initialState = {
    error: false,
    loading: false,
    processing: false,
    bundleList: [],
    bundleDetails: null,
   
  };
  
  export default function Modalreduce(state = initialState, action) {
    switch (action.type) {
  
      
      case GET_BUNDLES_LIST_START:
        return {
          ...state,
          error: false,
          loading: true,
          bundleList: [],
         
        };
      case GET_BUNDLES_LIST_FAIL:
        return {
          ...state,
          error: true,
          loading: false,
          bundleList: [],
        };
      case GET_BUNDLES_LIST_SUCCESS:
        return {
          ...state,
          error: false,
          loading: false,
          bundleList: action.bundleList,
        };
        
    //     case UPDATE_USER_START:
    //     return {
    //       ...state,
    //       error: false,
    //       loading: true,
    //       selectedUser: null,
    //     };
    //   case UPDATE_USER_FAIL:
    //     return {
    //       ...state,
    //       error: true,
    //       loading: false,
    //       userList: null,
    //     };
    //   case UPDATE_USER_SUCCESS:
    //     return {
    //       ...state,
    //       error: false,
    //       loading: false,
    //       userList: action.userId,
    //     };
      
      case DELETE_BUNDLE_START:
        return {
          ...state,
          processing: true,
        };
      case DELETE_BUNDLE_FAIL:
        return {
          ...state,
          processing: false,
        };
      case DELETE_BUNDLE_SUCCESS:
        return {
          ...state,
          processing: false,
          bundleList: [...state.bundleList.filter(({ id }) => id !== action.bundleId)],
        };
    
        case INSERT_BUNDLE_START:
        return {
          ...state,
          error: false,
          loading: true,
          bundleList: [],
          
        };
      case INSERT_BUNDLE_FAIL:
        return {
          ...state,
          loading: false,
          error: true,
          bundleList: [],
        };
      case INSERT_BUNDLE_SUCCESS:
        return {
          ...state,
          error: false,
          loading: false,
          bundleDetails: action.bundleDetails,
        };
   
       default:
        return state;
    }
  }
  