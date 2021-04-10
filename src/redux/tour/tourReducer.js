import {TOURS_LIST_REQUEST, TOURS_LIST_SUCCESS, TOURS_LIST_FAILURE, 
    FETCH_ONE_TOUR_REQUEST, FETCH_ONE_TOUR_SUCCESS, FETCH_ONE_TOUR_FAILURE, 
CREATE_OR_UPDATE_TOUR_REQUEST, CREATE_OR_UPDATE_TOUR_SUCCESS, CREATE_OR_UPDATE_TOUR_FAILURE, 
ADMIN_DELETE_TOUR_REQUEST, ADMIN_DELETE_TOUR_SUCCESS, ADMIN_DELETE_TOUR_FAILURE, 
TOURS_LIST_REQUEST_BY_TOUR_ORGANIZER, TOURS_LIST_SUCCESS_BY_TOUR_ORGANIZER, 
TOURS_LIST_FAILURE_BY_TOUR_ORGANIZER,
TOUR_ORGANIZER_DELETE_TOUR_REQUEST,
TOUR_ORGANIZER_DELETE_TOUR_SUCCESS,
TOUR_ORGANIZER_DELETE_TOUR_FAILURE,
ADD_HIKER_TO_TOUR_FAILURE,
ADD_HIKER_TO_TOUR_SUCCESS,
ADD_HIKER_TO_TOUR_REQUEST} from '../tour/tourActionTypes';

export const listToursReducer = (state={}, action) => {
    switch(action.type){
        case TOURS_LIST_REQUEST:
            return {...state, loading: true}
        case TOURS_LIST_SUCCESS:
            return {  loading: false,
                error: "",
                tours: action.tours,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                limit: action.limit,
                count: action.count};
        case TOURS_LIST_FAILURE:
            return {    loading: false,
                error: action.payload,
                tours: []};
        default:
            return state;
    }
}

export const singleTourReducer = (state={tour: {}}, action) =>{
    switch(action.type){
        case FETCH_ONE_TOUR_REQUEST:
            return {...state, loading:true};
        case FETCH_ONE_TOUR_SUCCESS:
            return {loading:false, tour: action.payload, error:""};
        case FETCH_ONE_TOUR_FAILURE:
            return {loading:false, tour:{}, error:action.payload};
        default:
            return state;
    }
}


export const addHikerToTourReducer = (state={}, action) =>{
    switch(action.type){
        case ADD_HIKER_TO_TOUR_REQUEST:
            return {loading:true, successAdd:false};
        case ADD_HIKER_TO_TOUR_SUCCESS:
            return {loading:false, hiker: action.payload, successAdd:true};
        case ADD_HIKER_TO_TOUR_FAILURE:
            return {loading:false, error:action.payload, successAdd:false};
        default:
            return state;
    }
}


export const  createOrUpdateTourReducer =(state={},action) => {
    switch(action.type){
        case CREATE_OR_UPDATE_TOUR_REQUEST:
            return { ...state, loading: true};
        case CREATE_OR_UPDATE_TOUR_SUCCESS:
            return {loading: false, tour:action.payload, error:""};
        case CREATE_OR_UPDATE_TOUR_FAILURE:
            return {loading: false, tour:{}, error:action.payload};
        default:
            return state;
    }
}

export const deleteTourByAdminReducer = (state={}, action) => {
    switch(action.type){
        case ADMIN_DELETE_TOUR_REQUEST:
            return { ...state, loading: true};
        case ADMIN_DELETE_TOUR_SUCCESS:
            return {loading: false, tour:action.payload, success: true};
        case ADMIN_DELETE_TOUR_FAILURE:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}

export const tourListByOrganizerReducer = (state={}, action) => {
    switch (action.type){
        case TOURS_LIST_REQUEST_BY_TOUR_ORGANIZER:
            return {...state, loading: true};
        case TOURS_LIST_SUCCESS_BY_TOUR_ORGANIZER:
            return {
                loading: false,
                error: "",
                tours: action.tours,
                limit : action.limit,
                count: action.count,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
            };
        case TOURS_LIST_FAILURE_BY_TOUR_ORGANIZER:
            return {
                loading: false,
                error: action.payload,
                tours: []
            }
        default:
            return state;

    }
}

export const deleteTourByTourOrganizerReducer = (state={}, action) => {
    switch(action.type){
        case TOUR_ORGANIZER_DELETE_TOUR_REQUEST:
            return { ...state, loading: true};
        case TOUR_ORGANIZER_DELETE_TOUR_SUCCESS:
            return {loading: false, tour:action.payload, success: true};
        case TOUR_ORGANIZER_DELETE_TOUR_FAILURE:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}