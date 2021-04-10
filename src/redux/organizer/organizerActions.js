import axios from "axios";
import { LIST_TOUR_ORGANIZERS_REQUEST, LIST_TOUR_ORGANIZERS_SUCCESS, 
    LIST_TOUR_ORGANIZERS_FAILURE,REGISTER_TOUR_ORGANIZER_FAILURE, 
    REGISTER_TOUR_ORGANIZER_REQUEST, REGISTER_TOUR_ORGANIZER_SUCCESS, 
    SIGNIN_TOUR_ORGANIZER_REQUEST, SIGNIN_TOUR_ORGANIZER_SUCCESS, 
    SIGNOUT_TOUR_ORGANIZER,
     DELETE_TOUR_ORGANIZER_REQUEST, DELETE_TOUR_ORGANIZER_SUCCESS, DELETE_TOUR_ORGANIZER_FAILURE,
     GET_SINGLE_TOUR_ORGANIZER_REQUEST, GET_SINGLE_TOUR_ORGANIZER_SUCCESS, 
     GET_SINGLE_TOUR_ORGANIZER_FAILURE, 
     SIGNIN_TOUR_ORGANIZER_FAILURE, 
     UPDATE_TOUR_ORGANIZER_REQUEST,
     UPDATE_TOUR_ORGANIZER_SUCCESS,
     UPDATE_TOUR_ORGANIZER_FAILURE,
     DISPLAY_TOURS_OF_TOUR_ORGANIZER_REQUEST,
     DISPLAY_TOURS_OF_TOUR_ORGANIZER_SUCCESS,
     DISPLAY_TOURS_OF_TOUR_ORGANIZER_FAILURE} from "./organizerActionTypes"

import Cookies from 'js-cookie';

const url = "http://localhost:3400/tourOperators";

export const registerOrganizerRequest = (organizer) =>{
    return {type: REGISTER_TOUR_ORGANIZER_REQUEST, payload: organizer}
}

export const registerOrganizerSuccess = (data) =>{
    return {type: REGISTER_TOUR_ORGANIZER_SUCCESS, payload: data}
}

export const registerOrganizerFailure = (error) => {
    return {type: REGISTER_TOUR_ORGANIZER_FAILURE, payload: error};
}

export const registerOrganizer= (name, image, email, password, street, city, district, governorate, phoneNumber, 
    contactName) => async (dispatch) => {
        try{ dispatch(registerOrganizerRequest(name, image, email, password, street, city, district, governorate, 
            phoneNumber, contactName));
            const {data} = await axios.post(`${url}/register`, {name, image, email, password, street, city, district, governorate, 
                phoneNumber, contactName});
            dispatch(registerOrganizerSuccess(data));
            Cookies.set('orgInfo', JSON.stringify(data));
            console.log("data", data);
        }
        catch(err){
            dispatch(registerOrganizerFailure(err));
        }
    }



    export const signInOrganizerRequest = (email, password) => {
        return {type: SIGNIN_TOUR_ORGANIZER_REQUEST, payload:{email, password}}
    }

    export const signInOrganizerSuccess = (data) => {
        return {type: SIGNIN_TOUR_ORGANIZER_SUCCESS, payload: data}
    }

    export const signInOrganizerFailure = (error) => {
        return {type: SIGNIN_TOUR_ORGANIZER_FAILURE, payload: error}
    }

    export const signinOrganizer = (email, password) => async (dispatch) =>{
        try{ dispatch(signInOrganizerRequest(email, password));
            const {data} = await axios.post(`${url}/signin`, {email, password});
            dispatch(signInOrganizerSuccess(data));
            Cookies.set('orgInfo', JSON.stringify(data));
            console.log("Cookies", Cookies);
        } catch(err){
            dispatch(signInOrganizerFailure(err));
        }
    }

/*******************************LIST ORGANIZERS UNAUTHENTICATED********************************************************/ 

export const listTourOrganizersRequest = () => {
    return {type: LIST_TOUR_ORGANIZERS_REQUEST};
}

export const listTourOrganizersSuccess = (data) => {
    return {type: LIST_TOUR_ORGANIZERS_SUCCESS, 
            tourOrganizers: data.tourOrganizers,
            totalPages: data.totalPages,
            currentPage: data.currentPage,
            limit: data.limit,
            count:data.count};
    }

export const listTourOrganizersFailure = (error) => {
    return {type: LIST_TOUR_ORGANIZERS_FAILURE, payload: error};
}

export const listTourOrganizers = (searchKeyword="", page = 1, limit = 4) => async(dispatch)=> {
    try{ 
        dispatch(listTourOrganizersRequest());
        const {data} = await axios.get(`${url}?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`);
        dispatch(listTourOrganizersSuccess(data))
        console.log("org_data", data)

    } catch(error){
        dispatch(listTourOrganizersFailure(error))
    }
}


/*******************************DELETE ORGANIZER********************************************************/ 

export const deleteTourOrganizerRequest = (orgId)=> {
    return {type: DELETE_TOUR_ORGANIZER_REQUEST, payload: orgId};
}

export const deleteTourOrganizerSuccess = (data)=> {
    return {type: DELETE_TOUR_ORGANIZER_SUCCESS, payload: data, success: true};
}

export const deleteTourOrganizerFailure=(error) => {
    return {type: DELETE_TOUR_ORGANIZER_FAILURE, payload: error}
}

export const deleteTourOrganizer = (orgId) => async (dispatch, getState) => {
    try{
        const {userSignin : {userInfo}} = getState();
        dispatch(deleteTourOrganizerRequest(orgId));
        const data = await axios.delete(`${url}/${orgId}`, {headers:{Authorization :"Bearer " + userInfo.token}});
        dispatch(deleteTourOrganizerSuccess(data));
    }catch(err){
        dispatch(deleteTourOrganizerFailure(err));
    }
}

/*******************************GET ORGANIZER BY ADMIN********************************************************/ 

export const getSingleTourOrganizerRequest = (orgId) =>{
    return {type: GET_SINGLE_TOUR_ORGANIZER_REQUEST, payload:orgId};
}

export const getSingleTourOrganizerSuccess = (organizer) =>{
    return {type: GET_SINGLE_TOUR_ORGANIZER_SUCCESS, payload: organizer};
}

export const getSingleTourOrganizerFailure = (error) =>{
    return {type: GET_SINGLE_TOUR_ORGANIZER_FAILURE, payload: error};
}

export const getSingleTourOrganizer = (orgId) => async (dispatch) =>{
    try{ 
        dispatch(getSingleTourOrganizerRequest(orgId));
        const {data} = await axios.get(`${url}/${orgId}`);
        dispatch(getSingleTourOrganizerSuccess(data));
    } catch(err){
        dispatch(getSingleTourOrganizerFailure(err));
    }
}

/*******************************SIGNOUT ORGANIZER********************************************************/ 


export const signOutOrganizer = () => (dispatch) => {
    Cookies.remove('orgInfo');
    dispatch({ type: SIGNOUT_TOUR_ORGANIZER });
}

/*******************************UPDATE ORGANIZER********************************************************/ 

export const updateTourOrganizerRequest = ({orgId, name, image, email, password, street, city, district, governorate, phoneNumber, contactName})=> {
    return {type: UPDATE_TOUR_ORGANIZER_REQUEST, 
        payload: {orgId, name, image, email, password, street, city, district, governorate, phoneNumber, contactName}};
}

export const updateTourOrganizerSuccess = (data)=> {
    return {type: UPDATE_TOUR_ORGANIZER_SUCCESS, payload: data, success: true};
}

export const updateTourOrganizerFailure=(error) => {
    return {type: UPDATE_TOUR_ORGANIZER_FAILURE, payload: error}
}

export const updateTourOrganizer = ({id, name, image, email, password, street, city, 
    district, governorate, phoneNumber, contactName}) => async (dispatch, getState) => {
    try{ 
        const {orgSignin: {orgInfo}} = getState();
        dispatch(updateTourOrganizerRequest({id, name, image, email, password, street, city, district, governorate, phoneNumber, contactName}));
        const data = await axios.patch(`${url}/${id}`, 
        {id, name, image, email, password, street, city, district, governorate, phoneNumber, contactName},
        {headers: {Authorization: "Bearer " + orgInfo.token}});
        dispatch(updateTourOrganizerSuccess(data));
        Cookies.set('orgInfo', JSON.stringify(data));
    }catch(err){
        dispatch(updateTourOrganizerFailure(err));
    }
}

/*******************************DISPLAY TOURS OF TOUR ORGANIZER********************************************************/ 

export const displayToursOfTourOrganizerRequest = (orgId) => {
    return {type: DISPLAY_TOURS_OF_TOUR_ORGANIZER_REQUEST, payload: orgId};
}

export const displayToursOfTourOrganizerSuccess = (data) => {
    return {type:DISPLAY_TOURS_OF_TOUR_ORGANIZER_SUCCESS,
        tours: data.tours,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        limit: data.limit,
        count:data.count}
}

export const displayToursOfTourOrganizerFailure = (error) => {
    return {type: DISPLAY_TOURS_OF_TOUR_ORGANIZER_FAILURE, payload: error}
}

export const displayToursOfTourOrganizer = (orgId, searchKeyword = "", governorate="", hikingLevel="", 
date="", page = 1, limit = 4) => async (dispatch) => {
 try{      
     dispatch(displayToursOfTourOrganizerRequest(orgId));
    const {data} = await axios.get(`${url}/${orgId}/tours?searchKeyword=${searchKeyword}&governorate=${governorate}&hikingLevel=${hikingLevel}&date=${date}&page=${page}&limit=${limit}`);
    dispatch(displayToursOfTourOrganizerSuccess(data));

 }catch(err){
     dispatch(displayToursOfTourOrganizerFailure(err));
 }
}