import axios from  'axios';
import {TOURS_LIST_REQUEST, TOURS_LIST_SUCCESS, TOURS_LIST_FAILURE, 
    FETCH_ONE_TOUR_REQUEST, FETCH_ONE_TOUR_SUCCESS, FETCH_ONE_TOUR_FAILURE, 
    CREATE_OR_UPDATE_TOUR_REQUEST, CREATE_OR_UPDATE_TOUR_FAILURE, CREATE_OR_UPDATE_TOUR_SUCCESS, ADMIN_DELETE_TOUR_REQUEST, ADMIN_DELETE_TOUR_SUCCESS, ADMIN_DELETE_TOUR_FAILURE, TOURS_LIST_REQUEST_BY_TOUR_ORGANIZER, TOURS_LIST_SUCCESS_BY_TOUR_ORGANIZER, TOURS_LIST_FAILURE_BY_TOUR_ORGANIZER, TOUR_ORGANIZER_DELETE_TOUR_REQUEST, TOUR_ORGANIZER_DELETE_TOUR_SUCCESS, TOUR_ORGANIZER_DELETE_TOUR_FAILURE, ADD_HIKER_TO_TOUR_REQUEST, ADD_HIKER_TO_TOUR_SUCCESS, ADD_HIKER_TO_TOUR_FAILURE, SHOW_TOURS_OF_HIKER_REQUEST, SHOW_TOURS_OF_HIKER_SUCCESS, SHOW_TOURS_OF_HIKER_FAILURE}
     from '../tour/tourActionTypes';
import {authHeader, userAuthHeader, orgAuthHeader} from '../authHeader';

const url = "http://localhost:3400/tours";


////////////////////////////////////////Fetch All Tours////////////////////////////////////////

export const listToursRequest = () => {
    return {type: TOURS_LIST_REQUEST};
}

export const listToursSuccess = (data) => {
    return {type: TOURS_LIST_SUCCESS, 
            tours: data.tours,
            totalPages: data.totalPages,
            currentPage: data.currentPage,
            limit: data.limit,
            count:data.count};
    }

export const listToursFailure = (error) => {
    return {type: TOURS_LIST_FAILURE, payload: error};
}

export const listTours = ( searchKeyword = "", governorate="", hikingLevel="", 
date="", page = 1, limit = 4) => async(dispatch)=> {
    try{ 
        dispatch(listToursRequest());
        const {data} = await axios.get(`${url}?searchKeyword=${searchKeyword}&governorate=${governorate}&hikingLevel=${hikingLevel}&date=${date}&page=${page}&limit=${limit}`);
        dispatch(listToursSuccess(data))
        console.log("tour_data", data)

    } catch(error){
        dispatch(listToursFailure(error))
    }
}


/****************************************FETCH ONE TOUR ***************************************/

export const fetchSingleTourRequest = (tourId)  => {
    return { type: FETCH_ONE_TOUR_REQUEST, payload: tourId };
}

export const fetchSingleTourSuccess = (data) => {
    return {type:  FETCH_ONE_TOUR_SUCCESS, payload: data};
}

export const fetchSingleTourFailure = (error) =>{
    return {type: FETCH_ONE_TOUR_FAILURE, payload: error};
}

export const singleTourDetails = (tourId) => async (dispatch) => {
    try { dispatch(fetchSingleTourRequest(tourId));

        const {data} = await axios.get(`${url}/${tourId}`);

        dispatch(fetchSingleTourSuccess(data));
        
    } catch (error) {
        dispatch(fetchSingleTourFailure(error))
    }
}

////////////////////////////////////////CREATE_OR_UPDATE A TOUR////////////////////////////////////////

export const createOrUpdateTourRequest =(tour) => {
    return {type: CREATE_OR_UPDATE_TOUR_REQUEST, payload:tour};
}

export const createOrUpdateTourSuccess =(data) => {
    return {type: CREATE_OR_UPDATE_TOUR_SUCCESS, payload:data};
}

export const createOrUpdateTourFailure =(error) => {
    return {type: CREATE_OR_UPDATE_TOUR_FAILURE, payload:error};
}

export const createOrUpdateTour = (tour) => async (dispatch) =>{
    try{
        dispatch(createOrUpdateTourRequest(tour));
        if(!tour._id){
        const {data} = await axios.post(url, tour, 
            { headers: orgAuthHeader()});
            dispatch(createOrUpdateTourSuccess(data));
        } else {
            const {data} = await axios.patch(`${url}/${tour._id}`, tour, 
            { headers: orgAuthHeader()});
            dispatch(createOrUpdateTourSuccess(data))
        }

    }catch(error){
        dispatch(createOrUpdateTourFailure(error))
    }
}


/**********************************************Delete Tour By Admin******************************************************/

export const deleteTourByAdminRequest= (tourId) => {
    return {type: ADMIN_DELETE_TOUR_REQUEST, payload: tourId};
}

export const deleteTourByAdminSuccess = (data) => {
    return {type: ADMIN_DELETE_TOUR_SUCCESS, payload: data, success: true};
}

export const deleteTourByAdminFailure = (error) => {
    return {type: ADMIN_DELETE_TOUR_FAILURE, payload: error};
}

export const deleteTourByAdmin = (tourId) => async (dispatch) => {
    try{ 
        dispatch(deleteTourByAdminRequest(tourId));
        const data = await axios.delete(`${url}/${tourId}`, 
        {headers: authHeader()});
        dispatch(deleteTourByAdminSuccess(data));
    }catch(err){
        dispatch(deleteTourByAdminFailure(err))
    }
}

/**********************************************ADD HIKER TO TOUR******************************************************/

export const addHikerToTourRequest= (tourId) => {
    return {type: ADD_HIKER_TO_TOUR_REQUEST, payload: tourId};
}

export const addHikerToTourSuccess = (data) => {
    return {type: ADD_HIKER_TO_TOUR_SUCCESS, hiker: data.hiker, 
            message: data.message, success: data.success};
}

export const addHikerToTourFailure = (error) => {
    return {type: ADD_HIKER_TO_TOUR_FAILURE, payload: error};
}

export const addHikerToTour = (tourId, user) => async (dispatch) => {
    try {
      dispatch(addHikerToTourRequest(tourId));
      const { data } = await axios.post(`${url}/${tourId}/hikers`, user,  
      {headers: userAuthHeader()});
      console.log("hiker to add", user);
      dispatch(addHikerToTourSuccess(data));
    } catch (error) {
      dispatch( addHikerToTourFailure(error));
    }
  };

////////////////////////////////////////Fetch All Tours////////////////////////////////////////

export const fetchToursRequestByOrganizer = () =>{
    return {type: TOURS_LIST_REQUEST_BY_TOUR_ORGANIZER}
};

export const fetchToursSuccessByOrganizer= (data) => {
    return {
        type: TOURS_LIST_SUCCESS_BY_TOUR_ORGANIZER,
        tours: data.tours,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        limit: data.limit,
        count: data.count
    }
}

export const fetchToursFailureByOrganizer = (error) =>{
    return {
        type: TOURS_LIST_FAILURE_BY_TOUR_ORGANIZER,
        payload: error
    }
}

export const listToursByOrganizer = (searchKeyWord="", page = 1, limit =5) => async (dispatch)  => {
    try {
        dispatch(fetchToursRequestByOrganizer());
        const { data } = await axios.get(`${url}/myTours?searchKeyword=${searchKeyWord}&page=${page}&limit=${limit}`, 
        {headers: orgAuthHeader()}
        );
        dispatch(fetchToursSuccessByOrganizer(data));
      } catch (error) {
        dispatch(fetchToursFailureByOrganizer(error));
      }
}

/**********************************************Delete Tour By Tour Organizer******************************************************/

export const deleteTourByTourOrganizerRequest= (tourId) => {
    return {type: TOUR_ORGANIZER_DELETE_TOUR_REQUEST, payload: tourId};
}

export const deleteTourByTourOrganizerSuccess = (data) => {
    return {type: TOUR_ORGANIZER_DELETE_TOUR_SUCCESS, payload: data, success: true};
}

export const deleteTourByTourOrganizerFailure = (error) => {
    return {type: TOUR_ORGANIZER_DELETE_TOUR_FAILURE, payload: error};
}

export const deleteTourByTourOrganizer = (tourId) => async (dispatch) => {
    try{ 
        dispatch(deleteTourByTourOrganizerRequest(tourId));
        const data = await axios.delete(`${url}/tourOrg/${tourId}`, 
        {headers: orgAuthHeader()});
        dispatch(deleteTourByTourOrganizerSuccess(data));
    }catch(err){
        dispatch(deleteTourByTourOrganizerFailure(err))
    }
}
/**********************************************ADD HIKER TO TOUR******************************************************/

export const showToursOfHikerRequest= () => {
    return {type: SHOW_TOURS_OF_HIKER_REQUEST};
}

export const showToursOfHikerSuccess = (data) => {
    return {type: SHOW_TOURS_OF_HIKER_SUCCESS,
        tours: data.tours,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        limit: data.limit,
        count:data.count};
}

export const showToursOfHikerFailure = (error) => {
    return {type: SHOW_TOURS_OF_HIKER_FAILURE, payload: error};
}

export const showToursOfHiker = (page = 1, limit = 4) => async (dispatch) => {
    try {
      dispatch(showToursOfHikerRequest());
      const { data } = await axios.get(`${url}/hikersTours?page=${page}&limit=${limit}`,  
      {headers: userAuthHeader()});
      dispatch(showToursOfHikerSuccess(data));
    } catch (error) {
      dispatch( showToursOfHikerFailure(error));
    }
  };

