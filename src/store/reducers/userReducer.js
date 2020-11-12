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
  REGISTER_USER_FAIL,
  GET_ROLES_LIST_FAIL,
  GET_ROLES_LIST_SUCCESS,
  GET_ROLES_LIST_START,
  GET_USERBYID_LIST_FAIL,
  GET_USERBYID_LIST_SUCCESS,
  GET_USERBYID_LIST_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_START,
  UPDATE_USER_FAIL,
  SELECT_USER
} from "../actions/actionType";

const initialState = {
  error: false,
  loading: false,
  processing: false,
  userList: [],
  roleList:[],
  userDetails: null,
 // isUserLogin:false,
};

export default function Modalreduce(state = initialState, action) {
  switch (action.type) {

    case GET_USERBYID_LIST_START:
      return {
        ...state,
        error: false,
        loading: true,
        selectedUser: null,
      };
    case GET_USERBYID_LIST_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
        userList: null,
      };
    case GET_USERBYID_LIST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        selectedUser: action.selectedUser,
      };

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
      
      case UPDATE_USER_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case UPDATE_USER_SUCCESS:
      const userList = state.userList;
      const udpatedIndex = userList.findIndex(({ id }) => action.selectedUser.id === id);

      if (udpatedIndex !== -1) {
        userList[udpatedIndex] = {
          ...userList[udpatedIndex],
          ...action.selectedUser,
        };
      }

      return {
        ...state,
        error: false,
        loading: false,
        selectedUser: action.selectedUser,
        userList,
      };
    
      case GET_ROLES_LIST_START:
        return {
          ...state,
          error: false,
          loading: true,
          roleList: [],
         
        };
        case GET_ROLES_LIST_FAIL:
          return {
            ...state,
            error: true,
            loading: false,
            roleList: [],
          };
        case GET_ROLES_LIST_SUCCESS:
          return {
            ...state,
            error: false,
            loading: false,
            roleList: action.roleList,
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
      case REGISTER_USER_START:
      return {
        ...state,
        error: false,
        loading: true,
        userList: [],
        
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        userList: [],
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        userDetails: action.userDetails,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userDetails: null,
      }
    case SELECT_USER:
      return {
        ...state,
        selectedUser: action.selectedUser,
      }
    default:
      return state;
  }
}
