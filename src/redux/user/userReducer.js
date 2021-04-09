import { DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, LIST_USERS_FAILURE, LIST_USERS_REQUEST, LIST_USERS_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, SIGNIN_USER_FAILURE, SIGNIN_USER_REQUEST, SIGNIN_USER_SUCCESS, SIGNOUT_USER, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "./userActionTypes";



export const signinUserReducer= (state= {loading:false, userInfo:{}, error:"", isAuthenticated:false}, action) => {
    switch(action.type){
        case SIGNIN_USER_REQUEST:
            return {loading: true};
        case SIGNIN_USER_SUCCESS:
            return {loading: false, userInfo: action.payload, error:"", isAuthenticated:true};
        case SIGNIN_USER_FAILURE:
            return {loading:false, error: action.payload};
        case SIGNOUT_USER:
            return {};
        default:
            return state;
    }
}

export const registerUserReducer = (state= {loading:false, userInfo:{}, error:""}, action) => {
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return {loading:true};
        case REGISTER_USER_SUCCESS:
            return {loading: false, error:"", userInfo: action.payload};
            case REGISTER_USER_FAILURE:
                return {loading:false, error: action.payload};
            case SIGNOUT_USER:
                return {};
            default:
                return state;
    }
}


export const listUsersReducer = (state={},action) =>{
    switch(action.type){
        case LIST_USERS_REQUEST:
            return {...state, loading: true};
        case LIST_USERS_SUCCESS:
            return {
                loading: false,
                error: "",
                users: action.users,
                limit : action.limit,
                count: action.count
            };
        case LIST_USERS_FAILURE:
            return {
                loading: false,
                error: action.payload,
                users: []
            }
        default:
            return state;
    }
}

export const deleteUserReducer = (state={user:{}}, action) => {
    switch(action.type){
        case DELETE_USER_REQUEST:
            return {loading: true};
        case DELETE_USER_SUCCESS:
            return {loading:false, user: action.payload, success: true};
        case DELETE_USER_FAILURE:
            return {loading:false, error:action.payload}
        default:
            return state;
    }
}

export const updateUserReducer = (state={}, action) => {
    switch(action.type){
        case UPDATE_USER_REQUEST:
            return { ...state, loading: true};
        case UPDATE_USER_SUCCESS:
            return { loading: false, organizer: action.payload, success: true };
        case UPDATE_USER_FAILURE:
            return {loading:false, organizer:{}, error:action.payload};
        default:
            return state;
    }
}