import {
  GET_USERS_LIST_START,
  GET_USERS_LIST_FAIL,
  GET_USERS_LIST_SUCCESS,
  DELETE_USER_START,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  LOGIN_USER_START,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL
} from "../actions/actionType";

const initialState = {
  error: false,
  loading: false,
  processing: false,
  userList: [],
  userDetails: null,
};

export default function Modalreduce(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_LIST_START:
      return {
        ...state,
        error: false,
        loading: true,
        userList: [],
      };
    case GET_USERS_LIST_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
        userList: [],
      };
    case GET_USERS_LIST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        userList: action.userList,
      };
    case DELETE_USER_START:
      return {
        ...state,
        processing: true,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        processing: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        processing: false,
        userList: [...state.userList.filter(({ id }) => id !== action.userId)],
      };
    case LOGIN_USER_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userDetails: action.userDetails,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userDetails: null,
      }
    default:
      return state;
  }
}
