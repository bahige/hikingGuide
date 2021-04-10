import { DELETE_TOUR_ORGANIZER_FAILURE, DELETE_TOUR_ORGANIZER_REQUEST, DELETE_TOUR_ORGANIZER_SUCCESS, 
    DISPLAY_TOURS_OF_TOUR_ORGANIZER_FAILURE, DISPLAY_TOURS_OF_TOUR_ORGANIZER_REQUEST, 
    DISPLAY_TOURS_OF_TOUR_ORGANIZER_SUCCESS, GET_SINGLE_TOUR_ORGANIZER_FAILURE, GET_SINGLE_TOUR_ORGANIZER_REQUEST,
     GET_SINGLE_TOUR_ORGANIZER_SUCCESS, LIST_TOUR_ORGANIZERS_FAILURE, LIST_TOUR_ORGANIZERS_REQUEST, 
    LIST_TOUR_ORGANIZERS_SUCCESS, REGISTER_TOUR_ORGANIZER_FAILURE, REGISTER_TOUR_ORGANIZER_REQUEST, 
    REGISTER_TOUR_ORGANIZER_SUCCESS, SIGNIN_TOUR_ORGANIZER_FAILURE, SIGNIN_TOUR_ORGANIZER_REQUEST, 
    SIGNIN_TOUR_ORGANIZER_SUCCESS, SIGNOUT_TOUR_ORGANIZER, UPDATE_TOUR_ORGANIZER_FAILURE, 
    UPDATE_TOUR_ORGANIZER_REQUEST, UPDATE_TOUR_ORGANIZER_SUCCESS } from "./organizerActionTypes";

export const registerOrganizerReducer = (state={loading:false, organizer:{}, error:""}, action) => {
    switch(action.type){
        case REGISTER_TOUR_ORGANIZER_REQUEST:
            return {...state, loading: true};
        case REGISTER_TOUR_ORGANIZER_SUCCESS:
            return {...state, organizer: action.payload};
        case REGISTER_TOUR_ORGANIZER_FAILURE:
            return {...state, error: action.payload};
        case SIGNOUT_TOUR_ORGANIZER:
            return {};
        default:
            return state;
    }
}


export const signinOrganizerReducer = (state={}, action) => {
    switch(action.type){
        case SIGNIN_TOUR_ORGANIZER_REQUEST:
            return {loading: true};
        case SIGNIN_TOUR_ORGANIZER_SUCCESS:
            return {loading: false, organizer: action.payload, error:"", isAuthenticated: true};
        case SIGNIN_TOUR_ORGANIZER_FAILURE:
            return {loading:false, error: action.payload};
        case SIGNOUT_TOUR_ORGANIZER:
            return {};
        default:
            return state;
    }
}


export const listTourOrganizersReducer = (state={}, action) => {
    switch(action.type){
        case LIST_TOUR_ORGANIZERS_REQUEST:
            return {...state, loading: true}
        case LIST_TOUR_ORGANIZERS_SUCCESS:
            return {  loading: false,
                error: "",
                tourOrganizers: action.tourOrganizers,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                limit: action.limit,
                count: action.count};
        case LIST_TOUR_ORGANIZERS_FAILURE:
            return {    loading: false,
                error: action.payload,
                tourOrganizers: []};
        default:
            return state;
    }
}


export const deleteTourOrganizerReducer = (state={}, action) =>{
    switch(action.type){
        case DELETE_TOUR_ORGANIZER_REQUEST:
            return { loading: true};
        case DELETE_TOUR_ORGANIZER_SUCCESS:
            return { loading: false, organizer: action.payload, success: true };
        case DELETE_TOUR_ORGANIZER_FAILURE:
            return {loading:false, error:action.payload};
        default:
            return state;
    }
}

export const getSingleTourOrganizerReducer = (state={ organizer: {}}, action) =>{
    switch(action.type){
        case GET_SINGLE_TOUR_ORGANIZER_REQUEST:
            return { loading: true, organizer:{}, error:""};
        case GET_SINGLE_TOUR_ORGANIZER_SUCCESS:
            return { loading: false, organizer: action.payload, error:"" };
        case GET_SINGLE_TOUR_ORGANIZER_FAILURE:
            return {loading:false, organizer: {}, error:action.payload};
        default:
            return state;
    }
}


export const updateTourOrganizerReducer = (state={}, action) =>{
    switch(action.type){
        case UPDATE_TOUR_ORGANIZER_REQUEST:
            return { ...state, loading: true};
        case UPDATE_TOUR_ORGANIZER_SUCCESS:
            return { loading: false, organizer: action.payload, success: true };
        case UPDATE_TOUR_ORGANIZER_FAILURE:
            return {loading:false, organizer:{}, error:action.payload};
        default:
            return state;
    }
}

export const displayToursOfTourOrganizerReducer = (state ={}, action) => {
    switch(action.type){
        case DISPLAY_TOURS_OF_TOUR_ORGANIZER_REQUEST:
            return {...state, loading: true}
            
        case DISPLAY_TOURS_OF_TOUR_ORGANIZER_SUCCESS:
            return {  loading: false,
                error: "",
                tours: action.tours,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                limit: action.limit,
                count: action.count};

        case DISPLAY_TOURS_OF_TOUR_ORGANIZER_FAILURE:
            return {loading: false, tours:[], error:action.payload}
        default: 
            return state;
    }
}