import React, { useState, useEffect} from 'react';
import FormStyle from '../HikerRegisterForm/RegisterFormStyle.module.css';


const PriceInclusionsForm = (props) => {

    const {tour, tourId, nextBlock, prevBlock,
        changeIncludesBreakfast, changeIncludesSnacks,
        changeIncludesInsurance, changeIncludesGuides, changeIncludesSnowshoes,
        includesBreakfast, includesGuides, includesInsurance, includesSnowshoes, includesSnacks} = props;


    
    useEffect(() => {
        handleIncludesGuides(tourId);  
        handleIncludesBreakfast(tourId);  
        handleIncludesSnacks(tourId);  
        handleIncludesInsurance(tourId);  
        handleIncludesSnowshoes(tourId);  
    }, [tour])


    const handleIncludesGuides = (tourId) =>{
        if(tourId){
        changeIncludesGuides(tour.includesGuides);
        } 
    }

    const handleIncludesBreakfast = (tourId) =>{
        if(tourId){
        changeIncludesBreakfast(tour.includesBreakfast);
        } 
    }

    const handleIncludesSnacks = (tourId) =>{
        if(tourId){
        changeIncludesSnacks(tour.includesSnacks);
        } 
    }

    const handleIncludesInsurance = (tourId) =>{
        if(tourId){
        changeIncludesInsurance(tour.includesInsurance);
        } 
    }

    const handleIncludesSnowshoes = (tourId) =>{
        if(tourId){
        changeIncludesSnowshoes(tour.includesSnowshoes);
        } 
    }


    return (
        <div id={FormStyle.priceInclusionForm} className={FormStyle.form}>  
                
                <div className={FormStyle.checkbox}>
                <label className={FormStyle.label} htmlFor="includesGuides"> Does Price Include Guides? </label>
                <input type="checkbox" name="includesGuides" checked={includesGuides}
                onChange={e =>changeIncludesGuides(e.target.checked)} />
                </div>

                <div className={FormStyle.checkbox}>
                <label className={FormStyle.label} htmlFor="includesBreakfast"> Does Price Include Breakfast? </label>
                <input type="checkbox" name="includesBreakfast" checked={includesBreakfast}
                onChange={e =>changeIncludesBreakfast(e.target.checked)}/>
                </div>

                <div className={FormStyle.checkbox}>
                <label className={FormStyle.label} htmlFor="includesSnacks"> Does Price Include Snacks? </label>
                <input type="checkbox" name="includesSnacks" checked={includesSnacks} 
                onChange={e =>{changeIncludesSnacks(e.target.checked)}}/>
                </div>

                <div className={FormStyle.checkbox}>
                <label className={FormStyle.label} htmlFor="includesInsurance"> Does Price Include Insurance? </label>
                <input type="checkbox" name="includesInsurance" checked={includesInsurance}
                onChange={e =>changeIncludesInsurance(e.target.checked)}/>
                </div>

                <div className={FormStyle.checkbox}>
                <label className={FormStyle.label} htmlFor="includesSnowshoes"> Does Price Include Snowshoes? </label>
                <input type="checkbox" name="includesSnowshoes" checked={includesSnowshoes} 
                onChange={e =>changeIncludesSnowshoes(e.target.checked)}/>
                </div>

                <div className={FormStyle.btnContainer}>
                <div onClick={prevBlock} className={FormStyle.btnBack}> Back </div>
                <div onClick={nextBlock} className={FormStyle.btnNext}> Next </div>
                </div>

            </div>  
    )
}

export default PriceInclusionsForm
