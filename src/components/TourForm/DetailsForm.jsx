import React, { useState, useEffect } from 'react';
import FormStyle from '../HikerRegisterForm/RegisterFormStyle.module.css';


const DetailsForm = (props) => {

    const {tour, tourId, prevBlock, description, rules, paymentTerms, whatToBring,
        changeWhatToBring, changePaymentTerms, changeDescription, changeRules, submitTour} = props;


    const [descriptionError, setDescriptionError] = useState("");

    useEffect(() => {
        handleDescription(tourId);  
        handleRules(tourId);  
        handleWhatToBring(tourId);  
        handlePaymentTerms(tourId);  
    }, [tour])


    const handleDescription = (tourId) =>{
        if(tourId){
        changeDescription(tour.description);
        } 
    }

    const handleRules = (tourId) =>{
        if(tourId){
        changeRules(tour.rules);
        } 
    }

    const handleWhatToBring = (tourId) =>{
        if(tourId){
        changeWhatToBring(tour.whatToBring);
        } 
    }

    const handlePaymentTerms = (tourId) =>{
        if(tourId){
        changePaymentTerms(tour.paymentTerms);
        } 
    }


    const validateDescription = (description) => {
        let errors = "";
        if(!description){
            errors = "Description is Required."
        }
        setDescriptionError(errors);
    }

    return (
        <div id={FormStyle.detailsForm} className={FormStyle.form}>  
                
                <label className={FormStyle.label}> Hike Description*: </label>
                <textarea  name="description" rows={5}
                className={FormStyle.textarea} value={description}
                 onChange={e => changeDescription(e.target.value)}
                 onBlur={e => validateDescription(e.target.value)}/>
                 {descriptionError ? <div className="alarm"> {descriptionError} </div> : <div className="alarm"></div>}
                
                 <label className={FormStyle.label}> Hike Rules: </label>
                 <textarea  name="rules" rows={4}
                 className={FormStyle.textarea} value={rules}
                 onChange={e => changeRules(e.target.value)}/>
                 <div className="alarm"></div>

                 <label className={FormStyle.label}> What to Bring for Hike?: </label>
                <textarea  name="whatToBring" rows={3}
                className={FormStyle.textarea} value={whatToBring}
                onChange={e => changeWhatToBring(e.target.value)}/>
                <div className="alarm"></div>

                <label className={FormStyle.label}> Payment Terms: </label>
                <textarea  name="paymentTerms" rows={3}
                className={FormStyle.textarea} value={paymentTerms}
                onChange={e => changePaymentTerms(e.target.value)}/>
                <div className="alarm"></div>

                <div onClick={prevBlock} id={FormStyle.backButton} className={FormStyle.btn}> Back </div>
                <button type="submit" className={FormStyle.btn} onSubmit={submitTour}> {tourId ? "Edit Tour" : "Create Tour"}</button>

            </div>  
    )
}

export default DetailsForm
