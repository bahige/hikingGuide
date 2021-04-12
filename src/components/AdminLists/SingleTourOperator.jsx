import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleTourOrganizer } from '../../redux/organizer/organizerActions';
import ListStyle from './ListStyle.module.css';


const SingleTourOperator = (props) => {

    const organizerId = props.match.params.orgId;

    const singleTourData = useSelector(state => state.singleTourOrganizer);
    const {loading, organizer, error} = singleTourData;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleTourOrganizer(organizerId))
    }, [])

    return (
        <div>
            {loading ? <div> Loading </div> : error ? <div> Error: {error} </div> : organizer ?
            <div className={ListStyle.singleTourRow}>
                <img src={`/${organizer.image}`} alt={organizer.name}/>
            <div className={ListStyle.infoDetails}>
                <div> <u> {organizer.name} </u></div>
                <div> Contact Person: {organizer.contactName} </div>
                <div> Telephone: {organizer.phoneNumber} </div>
                <div> Email: {organizer.email} </div>
                <div> Address: {organizer.street}, {organizer.city}, {organizer.district} District, {organizer.governorate} Governorate </div>
            </div>
           </div> : null}
        </div>
    )
}

export default SingleTourOperator
