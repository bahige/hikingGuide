import {combineReducers} from 'redux';

import {singleTourReducer, createOrUpdateTourReducer, deleteTourByAdminReducer, tourListByOrganizerReducer,
deleteTourByTourOrganizerReducer, listToursReducer, addHikerToTourReducer} from './tour/tourReducer';
import {deleteUserReducer, listUsersReducer, registerUserReducer, signinUserReducer,
updateUserReducer} from './user/userReducer';
import {deleteTourOrganizerReducer, getSingleTourOrganizerReducer, 
listTourOrganizersReducer, registerOrganizerReducer, signinOrganizerReducer,
 updateTourOrganizerReducer, displayToursOfTourOrganizerReducer} from './organizer/organizerReducer';

const rootReducer = combineReducers({
    fetchTours: listToursReducer,
    fetchTourDetails: singleTourReducer,
    tourSave: createOrUpdateTourReducer,
    tourDeleteByAdmin: deleteTourByAdminReducer,
    fetchToursByOrganizer: tourListByOrganizerReducer,
    tourDeleteByOrganizer: deleteTourByTourOrganizerReducer,
    registerHikerToTour: addHikerToTourReducer,

    //Users
    signinUser:  signinUserReducer,
    registerUser: registerUserReducer,
    usersList: listUsersReducer,
    userDelete: deleteUserReducer,
    userUpdate: updateUserReducer,
    //Organizers:
    regOrganizer: registerOrganizerReducer,
    signinOrg: signinOrganizerReducer,
    orgList: listTourOrganizersReducer,
    deleteOrganizer: deleteTourOrganizerReducer,
    singleTourOrganizer: getSingleTourOrganizerReducer,
    updateOrganizer: updateTourOrganizerReducer,
    toursOfTourOrganizer: displayToursOfTourOrganizerReducer,})

    export default rootReducer;
