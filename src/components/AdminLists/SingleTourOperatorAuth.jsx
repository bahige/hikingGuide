import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ListStyle from './ListStyle.module.css';
import {useHistory} from 'react-router-dom';
import { getSingleTourOrganizer, getSingleTourOrganizerAuth } from '../../redux/organizer/organizerActions';


const SingleTourOperatorAuth = (props) => {

    const organizerId = props.match.params.authOrgId;

    const signinData = useSelector(state => state.singleTourOrganizer);
    const {loading, organizer, error} = signinData;
    const updatedOrganizer = useSelector(state => state.updateOrganizer);
    const {loading: loadingUpdate, organizer: organizerUpdated, success, error: errUpdate} = updatedOrganizer;
    console.log("hello", props.match.params.authOrgId); 

    const dispatch = useDispatch();

    const history = useHistory();

    const clickHandler = () =>{
        history.push(`${organizerId}/EditOrganizer`);
    }


    useEffect(() => {
        dispatch(getSingleTourOrganizer(organizerId))
    }, [success])

    return (
        <div>
            {loading ? <div> Loading </div> : error ? <div> Error: {error} </div> : organizer ?
                <div className={ListStyle.singleTourRow}>
                    <img src={`/${organizer.image}`} alt={organizer.name} />
                    <div className={ListStyle.infoDetails}>
                        <div> <u> {organizer.name} </u></div>
                        <div> Contact Person: {organizer.contactName} </div>
                        <div> Telephone: {organizer.phoneNumber} </div>
                        <div> Email: {organizer.email} </div>
                        <div> Address: {organizer.street}, {organizer.city}, {organizer.district} District, {organizer.governorate} Governorate </div>
                        <button className={ListStyle.btn}  onClick={clickHandler}> Edit Tour Organizer </button>
                    </div>

                </div> : null}
        </div>
    )
}

export default SingleTourOperatorAuth
