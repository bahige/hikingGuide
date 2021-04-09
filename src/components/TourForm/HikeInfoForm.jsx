import React, { useState, useEffect } from 'react';
import FormStyle from '../HikerRegisterForm/RegisterFormStyle.module.css';


const HikeInfoForm = (props) => {

    const {tour, nextBlock, prevBlock, tourId, 
        isFamilyFriendly, hikingDistance, hikingLevel, uphillHeight, downhillHeight,
    changeIsFamilyFriendly, changeHikingDistance, changeHikingLevel,
    changeUphillHeight, changeDownhillHeight} = props;


    const [hikingLevelError, setHikingLevelError] = useState("");
    const [hikingDistanceError, setHikingDistanceError] = useState("");


    useEffect(() => {
        handleHikingLevel(tourId);  
        handleHikingDistance(tourId);  
        handleUphillHeight(tourId);  
        handleDownhillHeight(tourId);  
        handleIsFamilyFriendly(tourId);  
    }, [tour])


    const handleHikingLevel = (tourId) =>{
        if(tourId){
        changeHikingLevel(tour.hikingLevel);
        } 
    }

    const handleHikingDistance = (tourId) =>{
        if(tourId){
        changeHikingDistance(tour.hikingDistance);
        } 
    }

    const handleUphillHeight = (tourId) =>{
        if(tourId){
        changeUphillHeight(tour.uphillHeight);
        } 
    }

    const handleDownhillHeight = (tourId) =>{
        if(tourId){
        changeDownhillHeight(tour.downhillHeight);
        } 
    }

    const handleIsFamilyFriendly = (tourId) =>{
        if(tourId){
        changeIsFamilyFriendly(tour.isFamilyFriendly);
        } 
    }


    const validateHikingLevel= (hikingLevel) => {
        let errors = "";
        if(!hikingLevel){
            errors = "Hiking Level is Required."
        }
        setHikingLevelError(errors);
    }


    const validateHikingDistance = (distance) => {
        let errors = "";
        if(!distance){
            errors = "Hiking Distance is Required."
        }
        setHikingDistanceError(errors);
    }


    return (
        <div id={FormStyle.hikeInfoForm} className={FormStyle.form}>  

                <div className={FormStyle.checkbox}>
                <label className={FormStyle.label} htmlFor="familyFriendly"> Is Family Friendly : </label>
                <input type="checkbox" name="isFamilyFriendly" checked={isFamilyFriendly}
                onChange={e =>{changeIsFamilyFriendly(e.target.checked);}}/>
                </div>   
                
                <label className={FormStyle.label}> Hiking Level*: </label>
                <input type="number" name="hikingLevel" min={0} max={10}
                className={FormStyle.input} value={hikingLevel}
                onChange={e => changeHikingLevel(e.target.value)}
                onBlur={e => validateHikingLevel(e.target.value)}/>
                {hikingLevelError ? <div className="alarm"> {hikingLevelError} </div> : <div className="alarm"></div>}

                <label className={FormStyle.label}> Hiking Distance in kilometers*: </label>
                <input type="number" name="hikingDistance" min={0} max={40}
                className={FormStyle.input} value={hikingDistance}
                onChange={e => changeHikingDistance(e.target.value)}
                onBlur={e => validateHikingDistance(e.target.value)}/>
                {hikingDistanceError ? <div className="alarm"> {hikingDistanceError} </div> : <div className="alarm"></div>}

                <label className={FormStyle.label}> Uphill Height in meters: </label>
                <input type="number" name="uphillHeight" min={0} max={2000}
                className={FormStyle.input} value={uphillHeight}
                onChange={e => changeUphillHeight(e.target.value)}/>
                <div className="alarm"></div>    

                <label className={FormStyle.label}> Downhill Height in meters: </label>
                <input type="number" name="downhillHeight" min={0} max={2000}
                className={FormStyle.input} value={downhillHeight}
                onChange={e => changeDownhillHeight(e.target.value)}/>
                <div className="alarm"></div>   

                <div className={FormStyle.btnContainer}>
                <div onClick={prevBlock} className={FormStyle.btnBack}> Back </div>
                <div onClick={nextBlock} className={FormStyle.btnNext}> Next </div>
                </div>

            </div>  
    )
}

export default HikeInfoForm
