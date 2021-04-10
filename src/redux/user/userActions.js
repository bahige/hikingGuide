import axios from "axios"
import { SIGNIN_USER_REQUEST, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILURE, SIGNOUT_USER, 
        REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
         LIST_USERS_REQUEST, LIST_USERS_SUCCESS, LIST_USERS_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } from "./userActionTypes"
import {authHeader, userAuthHeader} from '../authHeader';


const url = "http://localhost:3400/users";


export const signinUserRequest = (email, password) => {
    return { type: SIGNIN_USER_REQUEST, payload:{email, password} }
}

export const signinUserSuccess= (data) => {
    return { type: SIGNIN_USER_SUCCESS, payload:data }
}

export const signinUserFailure= (error) => {
    return { type: SIGNIN_USER_FAILURE, payload:error }
}

export const signinUser = (email, password) => async(dispatch) => {
    dispatch(signinUserRequest(email, password));
    try{
        const {data} = await axios.post(`${url}/signin`, { email, password }, {withCredentials:true});
        dispatch(signinUserSuccess(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    catch(err){
        dispatch(signinUserFailure(err));
    }
}

/***************************************Registering Users ***********************************************/

export const registerUserRequest = (firstName, lastName, email, password, age, gender ) => {
    return {type: REGISTER_USER_REQUEST, payload: {firstName, lastName, email, password, age, gender}};
}

export const registerUserSuccess = (data) => {
    return {type: REGISTER_USER_SUCCESS, payload: data};
}

export const registerUserFailure = (error) => {
    return {type: REGISTER_USER_FAILURE, payload: error};
}

export const registerUser =   (firstName, lastName, email, password, age, gender) => async (dispatch) => {
    try{ dispatch(registerUserRequest(firstName, lastName, email, password, age, gender));
        const {data} = await axios.post(`${url}/register`, 
        {firstName, lastName, email, password, age, gender},
        {withCredentials:true});
        dispatch(registerUserSuccess(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    catch(err){
        dispatch(registerUserFailure(err));
    }
}

/***************************************SignOut Users ***********************************************/

export const signOutUser = () => (dispatch)  => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("persistantState");
    dispatch({type: SIGNOUT_USER});
}

/***************************************LISTING Users ***********************************************/

export const listUsersRequest = () => {
    return {type: LIST_USERS_REQUEST};
}

export const listUsersSuccess = (data) => {
    return {type: LIST_USERS_SUCCESS,         
        users: data.users,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        limit: data.limit,
        count: data.count};
}

export const listUsersFailure = (error) => {
    return {type: LIST_USERS_FAILURE, payload:error};
}

export const listUsers = (page = 1, limit =4) => async (dispatch) => {
    try{ 
        dispatch(listUsersRequest());
        const {data} = await axios.get(`${url}?page=${page}&limit=${limit}`,
         { headers:authHeader()});
        dispatch(listUsersSuccess(data))
    }catch(error){
        dispatch(listUsersFailure(error));
    }
}

/***************************************DELETING Users ***********************************************/

export const deleteUserRequest = (userId) => {
    return {type: DELETE_USER_REQUEST, payload: userId}
}

export const deleteUserSuccess = (data) => {
    return {type: DELETE_USER_SUCCESS, payload:data, success: true}
}

export const deleteUserFailure =(error) => {
    return {type: DELETE_USER_FAILURE, payload: error}
}

export const deleteUser = (userId) => async (dispatch)=> {
    try{ 
        dispatch(deleteUserRequest(userId));
        const data = await axios.delete(`${url}/${userId}`,
         {headers: userAuthHeader()});
         dispatch(deleteUserSuccess(data));
         
    } catch(err){
        dispatch(deleteUserFailure(err));
    }
}

/***************************************UPDATING Users ***********************************************/

export const updateUserRequest = ({userId, firstName, lastName, email, password, age, gender}) => {
    return {type: UPDATE_USER_REQUEST, payload: {userId, firstName, lastName, email, password, age, gender}};
}

export const updateUserSuccess = (data) => {
    return {type: UPDATE_USER_SUCCESS, payload: data};
}

export const updateUserFailure = (error) => {
    return {type: UPDATE_USER_FAILURE, payload: error};
}

export const updateUser = ({userId, firstName, lastName, email, password, age, gender}) => 
async (dispatch) => {
    try{ 
        dispatch(updateUserRequest({userId, firstName, lastName, email, password, age, gender}));
        const data = await axios.patch(`${url}/${userId}`, 
        {userId, firstName, lastName, email, password, age, gender}, 
        {headers: userAuthHeader(), withCredentials:true});
        dispatch(updateUserSuccess(data));
        localStorage.setItem("userInfo", JSON.stringify(data));

    }catch(err){
        dispatch(updateUserFailure(err));
    }
}
