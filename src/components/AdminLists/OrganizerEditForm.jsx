import React, { useEffect, useState } from 'react';
import FormStyle from'../HikerRegisterForm/RegisterFormStyle.module.css';
import GovernorateSelect from '../GovernorateSelect';
import { useDispatch, useSelector } from 'react-redux';
import { registerOrganizer, getSingleTourOrganizer, updateTourOrganizer } from '../../redux/organizer/organizerActions';
import { useHistory } from 'react-router';

const OrganizerEditForm = (props) => {

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [image, setImage] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phoneNr, setPhoneNr] = useState();
    const [contactName, setContactName] = useState();
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [district, setDistrict] = useState();
    const [governorate, setGovernorate] = useState();
    

    const [emailError, setEmailError] = useState();
    const [phoneNrError, setPhoneNrError] = useState();




    const organizerData = useSelector(state => state.singleTourOrganizer);
    const {loading, organizer, error} =organizerData;
    const dispatch = useDispatch();

    const redirect ='/tours';
    const history = useHistory();
    const orgId = props.match.params.authOrgId;

    useEffect(() => {
      dispatch(getSingleTourOrganizer(orgId));
      setId(orgId);
      setName(organizer.name);
      setImage(organizer.image);
      setEmail(organizer.email);
      setPassword(organizer.password);
      setStreet(organizer.street);
      setCity(organizer.city);
      setDistrict(organizer.district);
      setGovernorate(organizer.governorate);
      setPhoneNr(organizer.phoneNumber);
      setContactName(organizer.contactName);    
    }, [])    
  

  const validateEmail = (email) => {
      let errors = "";
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        errors = "Invalid email address";
      }
      setEmailError(errors);
    };


    const validatePhoneNr = (phoneNr) => {
        let errors = "";
        const phoneNrRegex = /[0-9]{2}-[0-9]{6}/;
       if (!phoneNrRegex.test(phoneNr)) {
          errors = "Invalid telephone number";
        }
        setPhoneNrError(errors);
      };


const handleDistrict = (district) =>{
  setDistrict(district)
}

const handleGovernorate = (gov) =>{
  setGovernorate(gov)
}

///////////////////////Submit Handler////////////////////////////

const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateTourOrganizer({
      id: id,
      name: name,
      image: image,
      email: email,
      password: password,
      street: street,
      city: city,
      contactName: contactName,
      district: district,
      governorate: governorate,
      phoneNumber: phoneNr
    }));
      if(organizer){
        history.push('/tours');
    } else {
        history.push('/'); 
    }
  };

    return (
        <div className={FormStyle.orgRegContainer}>
            <form className={FormStyle.form} id={FormStyle.regForm} onSubmit={submitHandler}>
                <input  className={FormStyle.input} type="text" placeholder="Tour Organizer Name"
                onChange={(e) => setName(e.target.value)} value={name}/>

                <input  className={FormStyle.input} type="text" placeholder="Image"
                onChange={(e) => setImage(e.target.value)} value={image}/>


                <input  className={FormStyle.input} type="email" placeholder="Email"
                onChange={(e) => setEmail(e.target.value)} value={email}
                onBlur={(e)=>{validateEmail(e.target.value)}}/>
                {emailError ? <div className="alarm"> {emailError} </div> : null}

                <input  className={FormStyle.input} type="password" placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} value={password}/>


                <input  className={FormStyle.input} type="tel" placeholder="Phone Number (12-345678)"
                onChange={(e) => setPhoneNr(e.target.value)} value={phoneNr}
                onBlur={(e)=>{validatePhoneNr(e.target.value)}}/>
                {phoneNrError ? <div className="alarm"> {phoneNrError} </div> : null}

                <input  className={FormStyle.input} type="text" placeholder="Tour Organizer CEO"
                onChange={(e) => setContactName(e.target.value)} value={contactName}/>

                <input  className={FormStyle.input} type="text" placeholder="Street"
                onChange={(e) => setStreet(e.target.value)} value={street}/>

                <GovernorateSelect handleDistrict={handleDistrict} handleGovernorate={handleGovernorate}/>


                <input  className={FormStyle.input} type="text" placeholder="City"
                onChange={(e) => setCity(e.target.value)} value={city}/>
         
        
                <button type="submit" className={FormStyle.btn}
                disabled={ emailError || phoneNrError}> Edit Tour Organizer </button>
            </form>
        </div>
    )
}

export default OrganizerEditForm
