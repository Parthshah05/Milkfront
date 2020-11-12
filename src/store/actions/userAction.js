import client from "../../client";
import { history } from "../../routes";
//import { authenticate } from "../../components/auth/authentication";
import {
  getuserQuery,
  deleteUserMutation,
  userloginMutation,
  adduserMutation,
  getroleQuery,
  getUserByIdMutation,
  updateuserMutation,
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
  REGISTER_USER_START,
  GET_ROLES_LIST_FAIL,
  GET_ROLES_LIST_SUCCESS,
  GET_ROLES_LIST_START,
  GET_USERBYID_LIST_FAIL,
  GET_USERBYID_LIST_START,
  GET_USERBYID_LIST_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  SELECT_USER
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

const fetchUserbyIdStart = {
  type: GET_USERBYID_LIST_START,
};

const fetchUserbyIdFail = {
  type: GET_USERBYID_LIST_FAIL,
};

const fetchUserbyIdSuccess = (selectedUser) => {
  return {
    type: GET_USERBYID_LIST_SUCCESS,
    selectedUser,
  };
};

export const fetchUserbyId = (userId) => {
  return async (dispatch) => {
    
    dispatch(fetchUserbyIdStart);

    const { data } = await client.query({
      query: getUserByIdMutation(userId),
    });

    if (data.error) {
      dispatch(fetchUserbyIdFail);
    } else {
      dispatch(fetchUserbyIdSuccess(data.getUser[0]));
    }
  };
};

const fetchUserUpdateStart = {
  type: UPDATE_USER_START,
};

const fetchUserUpdateFail = {
  type: UPDATE_USER_FAIL,
};

const fetchUserUpdateSuccess = (selectedUser) => {
  return {
    type: UPDATE_USER_SUCCESS,
    selectedUser,
  };
};

export const fetchUserUpdateId = ({ id, name, email, password }) => {
  return async (dispatch) => {
    
    dispatch(fetchUserUpdateStart);

    const { data } = await client.mutate({
      mutation: updateuserMutation,
      variables: { id, name, email, password },
    });

    if (data.error) {
      dispatch(fetchUserUpdateFail);
    } else {
      dispatch(fetchUserUpdateSuccess(data.updateUser));
      history.push('/userlist');
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

const registerUserStart = {
  type: REGISTER_USER_START,
};

const registerUserFail = {
  type: REGISTER_USER_FAIL,
};

const registerUserSuccess = (userDetails) => {
  return {
    type: REGISTER_USER_SUCCESS,
    userDetails,
  };
};

export const RegisterUser = (name,email, password,role_id) => {
  return async (dispatch) => {
   
    dispatch(registerUserStart);

    const { data } = await client.mutate({
      mutation: adduserMutation,
      variables: {name, email, password, role_id },
    });

    if (data.error) {
      dispatch(registerUserFail);
    } else {
      localStorage.setItem("userLogin", JSON.stringify(data.addUser));
      dispatch(registerUserSuccess(data.addUser));
    }
  };
};

const fetchRolesStart = {
  type: GET_ROLES_LIST_START,
};

const fetchRolesFail = {
  type: GET_ROLES_LIST_FAIL,
};

const fetchRolesSuccess = (roleList) => {
  return {
    type: GET_ROLES_LIST_SUCCESS,
    roleList,
  };
};

export const fetchRoles = () => {
  return async (dispatch) => {
    
    dispatch(fetchRolesStart);

    const { data } = await client.query({
      query: getroleQuery,
    });

    if (data.error) {
      dispatch(fetchRolesFail);
    } else {
      dispatch(fetchRolesSuccess(data.getRole));
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

export const setSelectedUser = (selectedUser) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_USER,
      selectedUser,
    })
  }
};
