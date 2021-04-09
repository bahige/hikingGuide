import React, {useState, useEffect } from 'react';
import FormStyle from '../HikerRegisterForm/RegisterFormStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain } from '@fortawesome/free-solid-svg-icons';



const IntroductionForm = (props) => {

    const {tour, tourId, nextBlock, tourTitle, tourType, profileImage,
        changeTourTitle, changeProfileImage, changeTourType} = props;

    const tourTypeOptions = [
        {label:"Day Hike", value:"Day Hike"},
        {label:"Afternoon Hike", value:"Afternoon Hike"},
        {label:"Camping", value:"Camping"},
        {label:"Snowshoeing", value:"Snowshoeing"}
    ]

    const [tourTitleError, setTourTitleError] = useState("");
    const [tourTypeError, setTourTypeError] = useState("");

    useEffect(() => {
        handleTourTitle(tourId);  
        handleProfileImage(tourId);  
        handleTourType(tourId);  
    }, [tour])


    const handleTourTitle = (tourId) =>{
        if(tourId){
        changeTourTitle(tour.title);
        } 
    }

    const handleProfileImage = (tourId) =>{
        if(tourId){
        changeProfileImage(tour.profileImage);
        } 
    }

    const handleTourType = (tourId) =>{
        if(tourId){
        changeTourType(tour.tourType);
        } 
    }
    

    const validateTitle = (title) => {
        let errors = "";
        if(!title){
            errors = "Tour Title is Required."
        }
        setTourTitleError(errors);
    }

    const validateTourType = (tourType) => {
        let errors = "";
        if(!tourType){
            errors = "Tour Type is Required."
        }
        setTourTypeError(errors);
    }

    



    return (
        <div id={FormStyle.introForm} className={FormStyle.form}>

                <div className={FormStyle.icon} >
                <FontAwesomeIcon  icon={faMountain} /> <span> {tourId ? "Edit Tour" : "Create Tour"} </span>
                </div>

                <label className={FormStyle.label}> Tour Title*: </label>
                <input type="text" className={FormStyle.input} value={tourTitle}
                onChange={e =>changeTourTitle(e.target.value)}
                onBlur={e => validateTitle(e.target.value)}/>
                {tourTitleError ? <div className="alarm"> {tourTitleError} </div> : <div className="alarm"></div>}


                <label className={FormStyle.label}> Profile Image*: </label>               
                <input type="text" className={FormStyle.input} value={profileImage}
                onChange={e => changeProfileImage(e.target.value)}/>
                <div className="alarm"></div>

                <label className={FormStyle.label}> Tour Type*: </label>
                <select id="selectTourType" className={FormStyle.selectInput} 
                onChange={e =>{changeTourType(e.target.value)}}
                value={tourType}
                onBlur= {e => validateTourType(e.target.value)}>
                  {/* {tourTypeOptions.map(tourTypeOption=>(
                    <option key={tourTypeOption.key} value={tourTypeOption.value}>{tourTypeOption.label}</option>
                  ))} */}
                <option value="" selected disabled hidden> Select Tour Type </option> 
                <option value="Day Tour">Day Tour </option>
                <option value="Night Tour">Night Tour </option>
                <option value="Camping">Camping</option>
                <option value="City Tour">City Hightlights Tour</option>
                </select>
                {tourTypeError ? <div className="alarm"> {tourTypeError} </div> : <div className='alarm'></div>}

                <div onClick={nextBlock} className={FormStyle.btnNext}> Next </div>
            
                               
            </div>  
    )
}

export default IntroductionForm
