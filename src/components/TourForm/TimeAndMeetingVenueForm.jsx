import React, {useState, useEffect } from 'react';
import GovernorateSelect from '../GovernorateSelect';
import FormStyle from '../HikerRegisterForm/RegisterFormStyle.module.css';


const TimeAndMeetingVenueForm = (props) => {

    const {tour, nextBlock, prevBlock,tourId,
    meetingVenue, meetingVenueLink, date, departureTime, returningTime,
    changeDate, changeDepTime, changeRetTime, changeMeetingVenue, changeMeetingVenueLink} = props;


    const [dateError, setDateError] = useState("");
    const [departureTimeError, setDepartureTimeError] = useState("");
    const [returningTimeError, setReturningTimeError] = useState("");
    const [meetingVenueError, setMeetingVenueError] = useState("");


    useEffect(() => {
        handleDate(tourId);  
        handleDepartureTime(tourId);  
        handleReturningTime(tourId);  
        handleMeetingVenue(tourId);  
        handleMeetingVenueLink(tourId);  
    }, [tour])


    const handleDate = (tourId) =>{
        if(tourId){
        changeDate(tour.date);
        } 
    }

    const handleDepartureTime = (tourId) =>{
        if(tourId){
        changeDepTime(tour.departureTime);
        } 
    }

    const handleReturningTime = (tourId) =>{
        if(tourId){
        changeRetTime(tour.returningTime);
        } 
    }

    const handleMeetingVenue = (tourId) =>{
        if(tourId){
        changeMeetingVenue(tour.meetingPoint);
        } 
    }

    const handleMeetingVenueLink = (tourId) =>{
        if(tourId){
        changeMeetingVenueLink(tour.meetingVenueLink);
        } 
    }
    
   
    const validateDate = (date) => {
        let errors = "";
        if(!date){
            errors = "Tour Date is Required."
        }
        setDateError(errors);
    }

    const validateDepartureTime = (time) => {
        let errors = "";
        if(!time){
            errors = "Departure Time is Required."
        }
        setDepartureTimeError(errors);
    }

    const validateReturningTime = (time) => {
        let errors = "";
        if(!time){
            errors = "Returning Time is Required."
        }
        setReturningTimeError(errors);
    }

    const validateMeetingVenue = (venue) => {
        let errors = "";
        if(!venue){
            errors = "Meeting Venue is Required."
        }
        setMeetingVenueError(errors);
    }


    return (
        <div id={FormStyle.timeForm} className={FormStyle.form}>

                <div className={FormStyle.dateContainer}>

                <label className={FormStyle.label} htmlFor="tourDate"> Tour Date: </label>

                <input  className={FormStyle.input} type="date" name="tourDate" 
                onChange={(e)=> { changeDate(e.target.value);}}
                onBlur={(e)=>{validateDate(e.target.value)}}
                value={date}
                />
                {dateError ? <div className="alarm"> {dateError} </div> : <div className="alarm"></div>}

                </div>


                <div className={FormStyle.dateContainer}>

                <label className={FormStyle.label} htmlFor="departureTime"> Departure Time: </label>

                <input  className={FormStyle.input} type="time" name="departureTime" 
                onChange={(e)=> { changeDepTime(e.target.value); }}
                onBlur={(e)=>{validateDepartureTime(e.target.value)}}
                value={departureTime}
                />
                {departureTimeError ? <div className="alarm"> {departureTimeError} </div> : <div className="alarm"></div>}

                </div>

                <div className={FormStyle.dateContainer}>

                <label className={FormStyle.label} htmlFor="returningTime"> Returning Time: </label>

                <input  className={FormStyle.input} type="time" name="time" 
                onChange={(e)=> { changeRetTime(e.target.value); }}
                onBlur={(e)=>{validateReturningTime(e.target.value)}}
                value={returningTime}
                />
                {returningTimeError ? <div className="alarm"> {returningTimeError} </div> : <div className="alarm"></div>}

                </div>      

                <label className={FormStyle.label}> Meeting Venue*: </label>
                <input type="text"  name="meetingVenue"
                className={FormStyle.input} value={meetingVenue}
                onChange={e => changeMeetingVenue(e.target.value)}
                onBlur={e => validateMeetingVenue(e.target.value)}/>
                {meetingVenueError ? <div className="alarm"> {meetingVenueError} </div> : <div className="alarm"></div>}
                
                <label className={FormStyle.label}> Meeting Venue Link: </label>
                <input type="text"  name="meetingVenueLink"
                className={FormStyle.input} value={meetingVenueLink}
                onChange={e => changeMeetingVenueLink(e.target.value)}/>
                 <div className="alarm"></div>   
                
                <div className={FormStyle.btnContainer}>
                <div onClick={prevBlock} className={FormStyle.btnBack}> Back </div>
                <div onClick={nextBlock} className={FormStyle.btnNext}> Next </div>
                </div>
            </div>  
    )
}

export default TimeAndMeetingVenueForm
