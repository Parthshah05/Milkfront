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
        
        case UPDATE_BUNDLE_START:
          return {
            ...state,
            error: false,
            loading: true,
          };
        case UPDATE_BUNDLE_FAIL:
          return {
            ...state,
            error: true,
            loading: false,
          };
        case UPDATE_BUNDLE_SUCCESS:
          const bundleList = state.bundleList;
          const udpatedIndex = bundleList.findIndex(
            ({ id }) => action.selectedBundle.id === id
          );
    
          if (udpatedIndex !== -1) {
            bundleList[udpatedIndex] = {
              ...bundleList[udpatedIndex],
              ...action.selectedBundle,
            };
          }
    
          return {
            ...state,
            error: false,
            loading: false,
            selectedBundle: action.selectedBundle,
            bundleList,
          };
        case SELECT_BUNDLE:
          return {
            ...state,
            selectedBundle: action.selectedBundle,
          };
      
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
  