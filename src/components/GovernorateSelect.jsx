import React, { useState, useEffect } from 'react';
import FormStyle from './HikerRegisterForm/RegisterFormStyle.module.css';

// '../../HikerRegisterContainer/HikerRegisterForm//HikerFormStyle.module.css';

const GovernorateSelect = (props) => {

    const {handleDistrict, handleGovernorate} = props;


    const [districtError, setDistrictError] = useState("");
    const [governorateError, setGovernorateError] = useState("");

    const [selectedGovOption, setSelectedGovOption] = useState();

    
    useEffect(() => {
     
    }, [selectedGovOption])

    //////////////////////Validation Methods//////////////////////////////
    const validateDistrict = (district) => {
        let errors ='';
        if(!district){
            errors = "District Required."
        }
      setDistrictError(errors);    
    }
  
    const validateGovernorate = (governorate) => {
        let errors ='';
        if(!governorate){
            errors = "Governorate Required."
        }
      setGovernorateError(errors);    
    }

    const govOptions= [
        { value: 'Akkar', label: 'Akkar' },
        { value: 'Baalbek-Hermel', label: 'Baalbek-Hermel' },
        { value: 'Beirut', label: 'Beirut' },
        { value: 'Beqaa', label: 'Beqaa' },
        { value: 'Keserwan-Jbeil', label: 'Keserwan-Jbeil' },
        { value: 'Mount Lebanon', label: 'Mount Lebanon' },
        { value: 'Nabatiye', label: 'Nabatiye' },
        { value: 'North Lebanon', label: 'North Lebanon' },
        { value: 'South Lebanon', label: 'South Lebanon' },

    ]


    const districtOptions = selectedGovOption=== "Akkar" ? [{ value: 'Akkar', label: 'Akkar' }] 
    : selectedGovOption=== "Baalbek-Hermel"  ? [{ value: 'Baalbek', label: 'Baalbek' }, { value: 'Hermel', label: 'Hermel' } ]
    : selectedGovOption=== "Beirut" ? [{ value: 'Beirut', label: 'Beirut' }] 
    : selectedGovOption=== "Beqaa" ? [{ value: 'Rashaya', label: 'Rashaya' }, { value: 'West Beqaa', label: 'West Beqaa' }, { value: 'Zahle', label: 'Zahle' }, ] 
    : selectedGovOption=== "Keserwan-Jbeil" ? [{ value: 'Keserwan', label: 'Keserwan' }, { value: 'Jbeil', label: 'Jbeil' } ] 
    : selectedGovOption=== "Mount Lebanon" ? [{ value: 'Aley', label: 'Aley' }, { value: 'Baabda', label: 'Baabda' }, { value: 'Chouf', label: 'Chouf' }, , { value: 'Maten', label: 'Maten' } ] 
    : selectedGovOption=== "Nabatiye" ? [ { value: 'Bint Jbeil', label: 'Bint Jbeil' }, { value: 'Hasbaya', label: 'Hasbaya' }, { value: 'Marjeyoun', label: 'Marjeyoun'}, { value: 'Nabatieh', label: 'Nabatieh'},] 
    : selectedGovOption=== "North Lebanon" ? [ { value: 'Batroun', label: 'Batroun' }, { value: 'Bsharre', label: 'Bsharre' }, { value: 'Koura', label: 'Koura' }, { value: 'Tripoli-Dinniyye', label: 'Tripoli-Dinniyye' }, { value: 'Zgharta', label: 'Zgharta' }, ] 
    : selectedGovOption=== "South Lebanon" ? [ { value: 'Jezzine', label: 'Jezzine' }, { value: 'Saida', label: 'Saida' }, { value: 'Sour', label: 'Sour' }, ] 
     :[{ value: 'Choose District', label: 'Choose District' }];           


    const handleGovChange = (e) => {
      e.preventDefault();
      setSelectedGovOption(e.target.value);
      handleGovernorate(e.target.value)
    };

    const handleDistrictChange = (e) => {
      e.preventDefault();
      handleDistrict(e.target.value);
    };



    return (
        <div className={FormStyle.govSelectContainer}>

        <label className={FormStyle.label}> Governorate*: </label>
        <select className={FormStyle.selectInput} onChange={handleGovChange} 
        onBlur={e => validateGovernorate(e.target.value)}>
        <option value="" selected disabled hidden> Select Governorate -- </option> 
          {govOptions.map(gov=>(
            <option value={gov.value}>{gov.label}</option>
          ))}
        </select>
        {governorateError ? <div className="alarm"> {governorateError} </div> : <div className="alarm"></div>}
        
        <label className={FormStyle.label}> District*: </label>
        <select className={FormStyle.selectInput} onChange={handleDistrictChange} onClick={handleDistrictChange}
        onBlur= {e => validateDistrict(e.target.value)}> 
        <option value="" selected disabled> Select District -- </option> 
          {districtOptions.map(district=>(
            <option value={district.value}>{district.label}</option>
          ))}
        </select>
        {districtError ? <div className="alarm"> {districtError} </div> : <div className="alarm"></div>}     
        </div>
    )
}


export default GovernorateSelect
