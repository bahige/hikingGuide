import React, { useEffect, useState } from 'react';
import FormStyle from'../HikerRegisterForm/RegisterFormStyle.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { updateUser } from '../../redux/user/userActions';

const UserEditForm = (props) => {

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Custom', label: 'Custom' },
  ];


    const [id, setId] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();

    const [emailError, setEmailError] = useState();


    const userData = useSelector(state => state.signinUser);
    const {loading, userInfo, error} =userData;
    const updatedUserData = useSelector(state => state.userUpdate);
    const {success} =updatedUserData;

    const dispatch = useDispatch();

    const history = useHistory();

    const userId = props.match.params.userId;

    
    useEffect(() => {
      setId(userId);
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setEmail(userInfo.email);
      setPassword(userInfo.password);
      setGender(userInfo.gender);
      setAge(userInfo.age); 
    }, [success])    
  
    
    const handleAge =(date) => {
      let yOB = date.getFullYear();
      let currentYear = new Date().getFullYear();
      const age = currentYear - yOB;
      setAge(age);
    }

    const handleGender = (e) => {
      e.preventDefault();
      setGender(e.target.value);
    };


  const validateEmail = (email) => {
      let errors = "";
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        errors = "Invalid email address";
      }
      setEmailError(errors);
    };


 

///////////////////////Submit Handler////////////////////////////

const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({
      userId: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      gender: gender,
      age: age,
    }));
      if(userInfo){
        history.push('/tours');
    } else {
        history.push('/'); 
    }
  };

    return (
        <div className={FormStyle.hikerRegContainer}>
            <form className={FormStyle.form} id={FormStyle.regForm} onSubmit={submitHandler}>
                <input  className={FormStyle.input} type="text" placeholder="Tour Organizer Name"
                onChange={(e) => setFirstName(e.target.value)} value={firstName}/>

                <input  className={FormStyle.input} type="text" placeholder="Image"
                onChange={(e) => setLastName(e.target.value)} value={lastName}/>


                <input  className={FormStyle.input} type="email" placeholder="Email"
                onChange={(e) => setEmail(e.target.value)} value={email}
                onBlur={(e)=>{validateEmail(e.target.value)}}/>
                {emailError ? <div className="alarm"> {emailError} </div> : null}

                <input  className={FormStyle.input} type="password" placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} value={password}/>

                <div className={FormStyle.dateContainer}>

                <label className={FormStyle.label} htmlFor="dob"> Date of Birth: </label>

                <input  className={FormStyle.input} type="date" 
                placeholder="Date of Birth" name="Date of Birth" 
                onChange={(e) => {handleAge(e.target.valueAsDate)}}
                />

                </div>

                
                <select className={FormStyle.selectInput} onChange={handleGender}>
                <option value="" selected disabled hidden> Gender </option> 
                  {genderOptions.map(gen=>(
                    <option value={gen.value}>{gen.label}</option>
                  ))}
                </select>

                <button type="submit" className={FormStyle.btn}
                disabled={ emailError}> Edit User </button>
            </form>
        </div>
    )
}

export default UserEditForm
