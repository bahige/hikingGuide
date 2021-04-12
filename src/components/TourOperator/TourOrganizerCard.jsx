import React from 'react';
import TourStyles from '../Tours/Tours.module.css';




const TourOrganizerCard = (props) => {

    const {tourOperatorId, title, profileImage}= props;


    return (
        <div className={TourStyles.tourOrganizerCard} key={tourOperatorId}> 
            <img src={profileImage} alt="image"/>

            <div className={`${TourStyles.row} ${TourStyles.organizerTitle}`}>
                {title}
            </div>

        </div>
    )
}

export default TourOrganizerCard
