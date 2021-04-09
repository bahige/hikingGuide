import React, { useState, useEffect } from 'react';
import FormStyle from '../HikerRegisterForm/RegisterFormStyle.module.css';


const PricesForm = (props) => {

    const {tour, nextBlock, prevBlock, tourId,
    priceForAdults, priceForGroups, priceForMinors, priceForUnivStudents, priceNoTransp,
    changePriceForAdults, changePriceForMinors, changePriceForGroups, 
    changePriceNoTransp, changePriceForUnivStudents} = props;



    const [priceError, setPriceError] = useState("");

    useEffect(() => {
        handlePriceForAdults(tourId);  
        handlePriceForMinors(tourId);  
        handlePriceForUnivStudents(tourId);  
        handlePriceForGroups(tourId);  
        handlePriceNoTransp(tourId);  
    }, [tour])


    const handlePriceForAdults = (tourId) =>{
        if(tourId){
        changePriceForAdults(tour.price);
        } 
    }

    const handlePriceForMinors = (tourId) =>{
        if(tourId){
        changePriceForMinors(tour.priceForMinors);
        } 
    }

    const handlePriceForUnivStudents = (tourId) =>{
        if(tourId){
        changePriceForUnivStudents(tour.priceForUnivStudents);
        } 
    }

    const handlePriceForGroups = (tourId) =>{
        if(tourId){
        changePriceForGroups(tour.priceForGroups);
        } 
    }

    const handlePriceNoTransp = (tourId) =>{
        if(tourId){
        changePriceNoTransp(tour.priceNoTransp);
        } 
    }


    const validatePrice = (price) => {
        let errors = "";
        if(!price){
            errors = "Price for Adults With Transportation is Required."
        }
        setPriceError(errors);
    }
    

    return (
        <div  id={FormStyle.pricesForm} className={FormStyle.form}>  
                
                <label className={FormStyle.label}> Price for Adults with Transportation*: </label>
                <input type="number" name="priceForAdults" min={0}
                className={FormStyle.input} value={priceForAdults}
                onChange={e => changePriceForAdults(e.target.value)}
                onBlur={e => validatePrice(e.target.value)}/>
                {priceError ? <div className="alarm"> {priceError} </div> : <div className="alarm"></div>}

                <label className={FormStyle.label}> Price for Minors with Transportation: </label>
                <input type="number"  name="priceForMinors" min={0}
                className={FormStyle.input} value={priceForMinors}
                onChange={e => changePriceForMinors(e.target.value)}/>
                <div className="alarm"></div>      

                <label className={FormStyle.label}> Price for University Students with Transportation: </label>
                <input type="number" name="priceForUnivStudents" min={0}
                className={FormStyle.input} value={priceForUnivStudents}
                onChange={e => changePriceForUnivStudents(e.target.value)}/>
                <div className="alarm"></div>      

                <label className={FormStyle.label}> Price for Groups of 5 and More with Transportation: </label>
                <input type="number" name="priceForGroups" min={0}
                className={FormStyle.input} value={priceForGroups}
                onChange={e => changePriceForGroups(e.target.value)}/>
                <div className="alarm"></div>      

                <label className={FormStyle.label}> Price To Be Deducted In Case of No Transportation: </label>
                <input type="number" name="priceNoTransp" min={0}
                className={FormStyle.input} value={priceNoTransp}
                onChange={e => changePriceNoTransp(e.target.value)}/>
                <div className="alarm"></div>      
                
                <div className={FormStyle.btnContainer}>
                <div onClick={prevBlock} className={FormStyle.btnBack}> Back </div>
                <div onClick={nextBlock} className={FormStyle.btnNext}> Next </div>
                </div>
                
            </div>  
    )
}

export default PricesForm
