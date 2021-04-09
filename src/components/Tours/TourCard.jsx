import React, {useEffect, useState} from 'react';
// import image from '../../assets/images/bkassine.jpg';
import TourStyles from './Tours.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//icons
import { faBusAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock} from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillWaveAlt} from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleTourOrganizer } from '../../redux/organizer/organizerActions';




const TourCard = (props) => {

    const {tourId, title, profileImage, district, governorate, 
        meetingPoint, date, departureTime, returningTime, price, tourOrganizer}= props;

        const marginingLeft = {
            marginLeft :'5px'
        }


    return (
        <div className={TourStyles.tourCard} key={tourId}> 
            <img src={profileImage} alt="image"/>

            <div className={TourStyles.row} id={TourStyles.tourOperator}>
                <u> {title}</u>
            </div>

            <div className={TourStyles.row} id={TourStyles.timeCell}>
                <div className={TourStyles.row}>
                    <FontAwesomeIcon  icon={faCalendarAlt} />
                    <div style={marginingLeft}> <Moment format="MMMM Do, YYYY" date={date}></Moment></div>
                </div>
                <div className={TourStyles.row}>
                    <FontAwesomeIcon  icon={faClock} />
                    <div style={marginingLeft}> {departureTime} - {returningTime}</div>
                </div>
            </div>

            <div className={TourStyles.row}>
                <div className={TourStyles.row}>
                    <FontAwesomeIcon  icon={faMapMarkerAlt} />
                    <div style={marginingLeft}> {meetingPoint} </div>
                </div>
                <div className={TourStyles.row}>
                    <FontAwesomeIcon  icon={faMoneyBillWaveAlt} />
                    <div style={marginingLeft}>{price} LBP</div>
                </div>
            </div>

            <div className={TourStyles.row} id={TourStyles.tourOperator}>
                <FontAwesomeIcon  icon={faBusAlt} />
                <div style={marginingLeft}> {tourOrganizer}</div>
            </div>


            <div className={TourStyles.row} id={TourStyles.lastRow}>
                <div className={TourStyles.row}>
                    <div> District </div>
                </div>
                <div className={TourStyles.row}>
                    <div> Governorate </div>
                </div>
            </div>

            <div className={TourStyles.row} id={TourStyles.lastRow}>
                <div className={TourStyles.row}>
                    <div> {district} </div>
                </div>
                <div className={TourStyles.row}>
                    <div> {governorate} </div>
                </div>
            </div>
            
        </div>
    )
}

export default TourCard
