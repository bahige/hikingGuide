import React, { useEffect, useState } from 'react';
import DetailsStyle from './TourDetailsStyle.module.css';
import TourDetailsGallery from './TourDetailsGallery';
import {addHikerToTour, singleTourDetails} from '../../redux/tour/tourActions';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';


const TourDetails = (props) => {
    
    const tourData = useSelector(state => state.fetchTourDetails);
    const {loading, tour, error} = tourData; 
    const dispatch = useDispatch();
    console.log("tour operator", tour);

    const signinData = useSelector(state => state.signinUser);
    const { userInfo, isAuthenticated } =signinData;

    const regHikerData = useSelector(state =>state.registerHikerToTour);
    const {hiker, success} = regHikerData;

    const singleTourData = useSelector(state =>state.fetchTourDetails);

    const [userId, setUserId] = useState();
    const [successReg, setSuccessReg] = useState(false);
    console.log("userInfo", userInfo._id);
    

    

    useEffect(() => {
        dispatch(singleTourDetails(props.match.params.id));
        setUserId(userInfo._id);
        // setSuccessReg(false);
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addHikerToTour(props.match.params.id, {user: userId}));
        setSuccessReg(success);

    }



    return (

    ////////////////////////////////////////// Title Portion //////////////////////////////////////////
        <> 
        { loading ? <div>Loading... </div> 
        : error ? <div> Error: {error} </div> 
        :
        <div className={DetailsStyle.mainContainer}>
            <div className={DetailsStyle.titleRow}>

                <div className={DetailsStyle.typeOfTourTag}> {tour.tourType} </div>

                <div className={DetailsStyle.primaryTag}> <u>{tour.title}</u></div>

                <hr/>

                <div className={DetailsStyle.detailsRow}>
                    <div className={DetailsStyle.hostTag}><b><u>Host: {tour.tourOperator.name}</u></b>  </div>
                   {isAuthenticated ? 
                    <button className={DetailsStyle.reserveButton}
                     onClick={submitHandler}
                     disabled={successReg}> {successReg ? "Reserved" : "Reserve Hike"} </button>
                    : null } 
                </div>

            </div>

            <hr/>

        {/* ////////////////////////////////////////// Hiking Details Portion////////////////////////////////////////// */}



            <div className={DetailsStyle.infoDetailsRow}>

                        <div className={DetailsStyle.detailsCol}>
                            <div className={DetailsStyle.secondaryTag}> <b><u>Destination :</u></b> {tour.destination} </div>
                            <div className={DetailsStyle.secondaryTag}> <b><u>District :</u></b> {tour.district} </div>
                            <div className={DetailsStyle.secondaryTag}> <b><u>Governorate :</u></b> {tour.governorate} </div>
                            <div className={DetailsStyle.secondaryTag}><b><u>Distance from Beirut :</u></b> 45km </div>
                            <div className={DetailsStyle.secondaryTag}><b><u>Height Above Sea Level :</u></b>  1200m</div>
                        </div>

                        <div className={DetailsStyle.detailsCol}>
                            <div className={DetailsStyle.secondaryTag}><b><u>Date:</u></b> <Moment format="dddd MMMM DD, YYYY" date={tour.date}></Moment> </div>
                            <div className={DetailsStyle.secondaryTag}><b><u>Departure Time:</u></b>  {tour.departureTime}</div>
                            <div className={DetailsStyle.secondaryTag}><b><u>Returning Time:</u></b>   {tour.returningTime}</div>            
                            <div className={DetailsStyle.secondaryTag}><b><u>Meeting Venue:</u></b>  {tour.meetingPoint}</div>            
                            <div className={DetailsStyle.secondaryTag}><b><u>Meeting Venue Location Link:</u></b> https://dalecorazon.com/contact/</div>            
                        </div>

                        <div className={DetailsStyle.detailsCol}>
                            <div className={DetailsStyle.secondaryTag}> <b><u>Hiking Level:</u></b>  {tour.hikingLevel} </div>
                            <div className={DetailsStyle.secondaryTag}> <b><u>Family Friendly:</u></b> {tour.isFamilyFriendly ? <span>Yes</span> :<span>No</span> }  </div>
                            <div className={DetailsStyle.secondaryTag}> <b><u>Hiking Distance:</u></b> {tour.hikingDistance} km </div>
                            <div className={DetailsStyle.secondaryTag}> <b><u>Uphill Height:</u></b> {tour.uphillHeight} m </div>
                            <div className={DetailsStyle.secondaryTag}> <b><u>Downhill Height:</u></b> {tour.downhillHeight} m </div>
                        </div>
            
                    </div>

        <hr/>

        {/* ////////////////////////////////////////// Image Gallery and Prices Portion////////////////////////////////////////// */}


            <TourDetailsGallery profileImage={tour.profileImage} price={tour.price} priceForMinors={tour.priceForMinors} 
            priceForUnivStudents={tour.priceForUnivStudents} priceForGroups={tour.priceForGroups} 
            priceNoTransp={tour.priceNoTransp} includesBreakfast={tour.includesBreakfast} includesSnacks={tour.includesSnacks} 
            includesGuides={tour.includesGuides} includesInsurance={tour.includesInsurance} includesSnowshoes={tour.includesSnowshoes}/>


        {/* ////////////////////////////////////////// Details Portion////////////////////////////////////////// */}

            <div className={DetailsStyle.tourDetailsColumn}>
  
           <hr/>

            <div>
                <div className={DetailsStyle.secondaryTitleTag}><u>Details: </u></div>

                <div className={DetailsStyle.descriptionDetails}> 

                <div className={DetailsStyle.tertiaryTitleTag}><u>Description: </u></div>
                <p>HIKING LEVEL. 1 to 3 for easy, 4 to 6 for intermediate, 7 to 9 for strenuous                                                                                  
                 Level 4, will start from Hawka, visit the hermit, St. Marina and Deir Saidet Annoubine. It is a wonderful place to visit and you will have enough time to contemplate scenery and take pictures. The lunch will be by the river. It is a lovely place, a breathtaking setting. After lunch, you will continue to Mar Licha parking.
                Level 6 (13 km) have about 600 meters downhill and 300 meters uphill. The hike will start from Hadath El-Jebbe. The track cuts through a bushy forest, all downhill until you reach the old village of Annoubine, where you cross Qadicha River, from there we will continue uphill to meet with level 4 at Annoubine Monastery and continue together as one group. Then the trail becomes minor ascents and descents all the way to power station parking, where the hike ends.
                </p>

                <div className={DetailsStyle.tertiaryTitleTag}><u>Rules: </u></div>
                <p>- Smoking is strictly prohibited during the event 
                    - Always follow the guide on the designated trail
                    - Do not go off road without notifying the guide
                    - Do not get close to a cliff especially when the guide in charge tells you not to do so
                    - Although accidents are covered by the insurance but they remain under the responsibility of the member 
                    - Sometimes, due to reasons beyond our control, slight modifications to the program may occur. Ecotourism rules must be followed, otherwise personal accidents will not be accounted for by the insurance.</p>

                <div className={DetailsStyle.tertiaryTitleTag}><u>What To Bring: </u></div>

                <p>Medical face masks, Handgel, Snowsuit (or any waterproof clothing), waterproof boots (preferably after-ski boots), or get thick nylon bags to cover your walking shoes, wool socks (and an extra pair for 
                    changing, hat and gloves, lunch, light snacks that will boost up your energy such as dried fruits, water, sunglasses and sunscreen.</p>
                
        
                <div className={DetailsStyle.tertiaryTitleTag}><u>Payment Terms: </u></div>
                <p>- Cancellation with less than 24 hours’ notice will be charged half-price
                    - Reservations with less than 24 hours’ notice will be charged an extra 5’000 LBP
                    (e.g. Cancelling or booking for a Sunday’s event on Saturday will be subject to the above terms)</p>
                </div>
            </div>


        </div>
     
    </div>  }
     </>
        
    )
}

export default TourDetails
