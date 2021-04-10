import React, { useEffect, useState } from 'react';
import RegisterFormStyle from'../HikerRegisterForm/RegisterFormStyle.module.css';
import GovernorateSelect from '../GovernorateSelect';
import { useDispatch, useSelector } from 'react-redux';
import { registerOrganizer } from '../../redux/organizer/organizerActions';
import { useHistory } from 'react-router';

const OrganizerRegisterForm = () => {

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNr, setPhoneNr] = useState("");
    const [contactName, setContactName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [governorate, setGovernorate] = useState("");
    
    const [nameError, setNameError] = useState("");
    const [imageError, setImageError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [phoneNrError, setPhoneNrError] = useState("");
    const [contactNameError, setContactNameError] = useState("");
    const [streetError, setStreetError] = useState("");
    const [cityError, setCityError] = useState("");



    const regOrgData = useSelector(state => state.regOrganizer);
    const {loading, orgInfo, error} = regOrgData;
    const dispatch = useDispatch();

    const redirect ='/tours';
    const history = useHistory();


    useEffect(() => {
      if(orgInfo){
        history.push('/tours');
    } 
    }, [orgInfo])
    
    //////////////////////////////////////////////////////Validating methods////////////////////////////////////////////////////// 

    const validateName = (name) => {
        let errors ='';
        if(!name){
            errors = "Tour Organizer Company's Name Required."
        }
      setNameError(errors);    
    }

    const validateImage = (image) => {
      let errors ='';
      if(!image){
          errors = "Organizer's Logo Required."
      }
    setImageError(errors);    
  }


    const validateContactName = (contactName) => {
      let errors ='';
      if(!contactName){
          errors = "CEO Required."
      }
    setContactNameError(errors);    
  }

  const validateEmail = (email) => {
      let errors = "";
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!email) {
        errors = "Email Required";
      } else if (!emailRegex.test(email)) {
        errors = "Invalid email address";
      }
      setEmailError(errors);
    };

  const validatePassword = (password) => {
      let errors ='';
      if(!password){
          errors = "Password Required."
      }
    setPasswordError(errors);    
  }

  const validateConfirmPassword = (confirmPassword) => {
      let errors = "";
      if (!confirmPassword) {
        errors = "Confirm Password Required";
      } else if (confirmPassword !== password) {
        errors = "Password and Confirm Password must be identical.";
      }
      setConfirmPasswordError(errors);
    };

    const validatePhoneNr = (phoneNr) => {
        let errors = "";
        const phoneNrRegex = /[0-9]{2}-[0-9]{6}/;
        if (!phoneNr) {
          errors = "Telephone Number Required";
        } else if (!phoneNrRegex.test(phoneNr)) {
          errors = "Invalid telephone number";
        }
        setPhoneNrError(errors);
      };

  const validateStreet = (street) => {
      let errors ='';
      if(!street){
          errors = "Street Required."
      }
    setStreetError(errors);    
  }

  const validateCity = (city) => {
      let errors ='';
      if(!city){
          errors = "City Required."
      }
    setCityError(errors);    
  }

const handleDistrict = (district) =>{
  setDistrict(district)
}

const handleGovernorate = (gov) =>{
  setGovernorate(gov)
}

///////////////////////Submit Handler////////////////////////////

const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerOrganizer(name, image, email, password, street, city, 
      district, governorate, phoneNr, contactName));
  };

    return (
        <div>
            <form className={RegisterFormStyle.form} id={RegisterFormStyle.regForm} onSubmit={submitHandler}>
                <input  className={RegisterFormStyle.input} type="text" placeholder="Tour Organizer Name"
                onChange={(e) => setName(e.target.value)}
                onBlur={(e)=>{validateName(e.target.value)}}/>
                {nameError ? <div className="alarm"> {nameError} </div> : <div className="alarm"></div>}

                <input  className={RegisterFormStyle.input} type="text" placeholder="Image"
                onChange={(e) => setImage(e.target.value)}
                onBlur={(e)=>{validateImage(e.target.value)}}/>
                {imageError ? <div className="alarm"> {imageError} </div> : <div className="alarm"></div>}


                <input  className={RegisterFormStyle.input} type="email" placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e)=>{validateEmail(e.target.value)}}/>
                {emailError ? <div className="alarm"> {emailError} </div> : <div className="alarm"></div>}

                <input  className={RegisterFormStyle.input} type="password" placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e)=>{validatePassword(e.target.value)}}/>
                {passwordError ? <div className="alarm"> {passwordError} </div> : <div className="alarm"></div>}

                <input  className={RegisterFormStyle.input} type="password" placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={(e)=>{validateConfirmPassword(e.target.value)}}/>
                {confirmPasswordError ? <div className="alarm"> {confirmPasswordError} </div> : <div className="alarm"></div>}

                <input  className={RegisterFormStyle.input} type="tel" placeholder="Phone Number (12-345678)"
                onChange={(e) => setPhoneNr(e.target.value)}
                onBlur={(e)=>{validatePhoneNr(e.target.value)}}/>
                {phoneNrError ? <div className="alarm"> {phoneNrError} </div> : <div className="alarm"></div>}

                <input  className={RegisterFormStyle.input} type="text" placeholder="Tour Organizer CEO"
                onChange={(e) => setContactName(e.target.value)}
                onBlur={(e)=>{validateContactName(e.target.value)}}/>
                {contactNameError ? <div className="alarm"> {contactNameError} </div> : <div className="alarm"></div>}

                <input  className={RegisterFormStyle.input} type="text" placeholder="Street"
                onChange={(e) => setStreet(e.target.value)}
                onBlur={(e)=>{validateStreet(e.target.value)}}/>
                {streetError ? <div className="alarm"> {streetError} </div> : <div className="alarm"></div>}

                <GovernorateSelect handleDistrict={handleDistrict} handleGovernorate={handleGovernorate}/>


                <input  className={RegisterFormStyle.input} type="text" placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                onBlur={(e)=>{validateCity(e.target.value)}}/>
                {cityError ? <div className="alarm"> {cityError} </div> : <div className="alarm"></div>}


            
        
                <button type="submit" className={RegisterFormStyle.btn}
                disabled={nameError || emailError || passwordError 
                || confirmPasswordError || phoneNrError || contactNameError 
                || streetError || cityError}> Register as Tour Organizer </button>
            </form>
        </div>
    )
}

export default OrganizerRegisterForm
