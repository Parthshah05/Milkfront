import client from "../../client";
import { authenticate } from "../../components/auth/authentication";
import {
  getuserQuery,
  deleteUserMutation,
  userloginMutation,
} from "../../queries/queries";
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
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_START
} from "./actionType";

const fetchUsersStart = {
  type: GET_USERS_LIST_START,
};

const fetchUsersFail = {
  type: GET_USERS_LIST_FAIL,
};

const fetchUsersSuccess = (userList) => {
  return {
    type: GET_USERS_LIST_SUCCESS,
    userList,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    
    dispatch(fetchUsersStart);

    const { data } = await client.query({
      query: getuserQuery,
    });

    if (data.error) {
      dispatch(fetchUsersFail);
    } else {
      dispatch(fetchUsersSuccess(data.getUser));
    }
  };
};

const deleteUserStart = {
  type: DELETE_USER_START,
};

const deleteUserFail = {
  type: DELETE_USER_FAIL,
};

const deleteUserSuccess = (userId) => {
  return {
    type: DELETE_USER_SUCCESS,
    userId,
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    dispatch(deleteUserStart);

    const { data } = await client.mutate({
      mutation: deleteUserMutation,
      variables: { id: userId },
    });

    if (data.error) {
      dispatch(deleteUserFail);
    } else {
      dispatch(deleteUserSuccess(userId));
    }
  };
};

const loginUserStart = {
  type: LOGIN_USER_START,
};

const loginUserFail = {
  type: LOGIN_USER_FAIL,
};

const loginUserSuccess = (userDetails) => {
  return {
    type: LOGIN_USER_SUCCESS,
    userDetails,
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
   
    dispatch(loginUserStart);

    const { data } = await client.mutate({
      mutation: userloginMutation,
      variables: { email, password },
    });

    if (data.error) {
      dispatch(loginUserFail);
    } else {
      localStorage.setItem("userLogin", JSON.stringify(data.userLogin));
      dispatch(loginUserSuccess(data.userLogin));
    }
  };
};

const logoutUserSuccess = {
  type: LOGOUT_USER,
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutUserSuccess);
  };
};
