import React, {useState, useEffect } from 'react';
import GovernorateSelect from '../GovernorateSelect';
import FormStyle from '../HikerRegisterForm/RegisterFormStyle.module.css';


const DestinationForm = (props) => {

    const {tour, nextBlock, prevBlock, tourId, 
        destination, distanceFromMeetingVenue, heightAboveSeaLevel,
    changeDestination, changeDistrict, changeGov, changeHeightAboveSeaLevel,
    changeDistanceFromMeetingVenue} = props;



    const [destinationError, setDestinationError] = useState("");
    const [distanceError, setDistanceError] = useState("");
    const [heightAboveSeaLevelError, setHeightAboveSeaLevelError] = useState("");

    useEffect(() => {
        handleDestination(tourId);  
        handleDistanceFromMeetingVenue(tourId);  
        handleHeightAboveSeaLevel(tourId);  
    }, [tour])


    const handleDestination = (tourId) =>{
        if(tourId){
        changeDestination(tour.destination);
        } 
    }

    const handleDistrict = (dist) =>{
        changeDistrict(dist);
    }

    const handleGovernorate =(gov)=>{
        changeGov(gov);
    }


    const handleDistanceFromMeetingVenue = (tourId) =>{
        if(tourId){
        changeDistanceFromMeetingVenue(tour.distanceFromDeparturePoint);
        } 
    }

    const handleHeightAboveSeaLevel = (tourId) =>{
        if(tourId){
        changeHeightAboveSeaLevel(tour.heightAboveSeaLevel);
        } 
    }


    const validateDestination = (destination) => {
        let errors = "";
        if(!destination){
            errors = "Destination is Required."
        }
        setDestinationError(errors);
    }
    
    const validateDistanceFromMeetingVenue = (distance) => {
        let errors = "";
        if(!distance){
            errors = "Distance from Meeting Venue is Required."
        } 
        setDistanceError(errors);
    }

    const validateHeightAboveSeaLevel = (height) => {
        let errors = "";
        if(!height){
            errors = "Height Above Sea Level is Required."
        } 
        setHeightAboveSeaLevelError(errors);
    }




    return (
        <div id={FormStyle.destinationForm} className={FormStyle.form}>
                
                <label className={FormStyle.label}> Destination*: </label>
                <input type="text" name="destination"
                className={FormStyle.input} value={destination}
                onChange={e => changeDestination(e.target.value)}
                onBlur={e => validateDestination(e.target.value)}/>
                {destinationError ? <div className="alarm"> {destinationError} </div> : <div className="alarm"></div>}

                <GovernorateSelect handleDistrict={handleDistrict} handleGovernorate={handleGovernorate}/>


                <label className={FormStyle.label}> Distance from Departure Venue in kilometers*: </label>
                <input type="number" name="distance" min={0}
                className={FormStyle.input} value={distanceFromMeetingVenue}
                onChange={e => changeDistanceFromMeetingVenue(e.target.value)}
                onBlur={e => validateDistanceFromMeetingVenue(e.target.value)}/>
                {distanceError ? <div className="alarm"> {distanceError} </div> : <div className="alarm"></div>}
                
                <label className={FormStyle.label}> Height Above Sea Level in meters*: </label>
                <input type="number" name="heightAboveSeaLevel" min={0}
                className={FormStyle.input} value={heightAboveSeaLevel}
                onChange={e => changeHeightAboveSeaLevel(e.target.value)}
                onBlur={e => validateHeightAboveSeaLevel(e.target.value)}/>
                {heightAboveSeaLevelError ? <div className="alarm"> {heightAboveSeaLevelError} </div> : <div className="alarm"></div>}
                
                <div className={FormStyle.btnContainer}>
                <div onClick={prevBlock} className={FormStyle.btnBack}> Back </div>
                <div onClick={nextBlock} className={FormStyle.btnNext}> Next </div>
                </div>

            </div>  
    )
}

export default DestinationForm
