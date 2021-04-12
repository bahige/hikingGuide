import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { registerUser } from '../../redux/user/userActions';
import FormStyle from'./RegisterFormStyle.module.css';

const HikerRegisterForm = () => {
    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Custom', label: 'Custom' },
      ];

 
      
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [gender, setGender] = useState("");
      const [age, setAge] = useState(0);

      const [firstNameError, setFirstNameError] = useState("");
      const [lastNameError, setLastNameError] = useState("");
      const [emailError, setEmailError] = useState("");
      const [passwordError, setPasswordError] = useState("");
      const [confirmPasswordError, setConfirmPasswordError] = useState("");
      const [dateOfBirthError, setDateOfBirthError] = useState("");
      const [genderError, setGenderError] = useState("");

      const userData = useSelector(state => state.registerUser);
      const {loading, userInfo, error} = userData;

      const dispatch = useDispatch();

      const history = useHistory();

      useEffect(() => {
        if(userInfo){
          history.push('/tours');
      } 
      }, [userInfo])

      const handleAge =(date) => {
        let yOB = date.getFullYear();
        let currentYear = yOB!== null ? new Date().getFullYear() : Date.now();
        const age = currentYear - yOB;
        setAge(age);
      }

      const registerHandler = (e) =>{
        e.preventDefault();
        dispatch(registerUser(firstName,  lastName, email, password, age, gender));
     
        // history.push('/'); 
      }

    //////////////////////////////////////////////////////Validating methods////////////////////////////////////////////////////// 

      const validateFirstName = (firstName) => {
          let errors ='';
          if(!firstName){
              errors = "First Name Required."
          }
        setFirstNameError(errors);    
      }

      const validateLastName = (lastName) => {
        let errors ='';
        if(!lastName){
            errors = "Last Name Required."
        }
      setLastNameError(errors);    
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
          errors = "Field Required";
        } else if (confirmPassword !== password) {
          errors = "Password and Confirm Password must be identical.";
        }
        setConfirmPasswordError(errors);
      };

    const validateDOB = (dob) => {
        let errors ='';
        if(!dob){
            errors = "Date of Birth Required."
        }
      setDateOfBirthError(errors);    
    }

    const validateGender = (gender) => {
        let errors ='';
        if(!gender){
            errors = "Gender Required."
        }
      setGenderError(errors);    
    }

    const handleGender = (e) => {
      e.preventDefault();
      setGender(e.target.value);
    };

///////////////////////Submit Handler////////////////////////////



    return (
        <div>
            <form className={FormStyle.form} onSubmit={registerHandler}>
                
                <input   type="text" className={FormStyle.input}
                placeholder="First Name" name="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={(e)=>{validateFirstName(e.target.value)}}/>
                {firstNameError ? <div className="alarm"> {firstNameError} </div> : <div className="alarm"></div>}

                
                <input  className={FormStyle.input} type="text" 
                placeholder="Last Name" name="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                onBlur={(e)=>{validateLastName(e.target.value)}}/>
                {lastNameError ? <div className="alarm"> {lastNameError} </div> : <div className="alarm"></div>}

                
                <input  className={FormStyle.input} type="email" placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e)=>{validateEmail(e.target.value)}}/>
                {emailError ? <div className="alarm"> {emailError} </div> : <div className="alarm"></div>}


                
                <input   className={FormStyle.input} type="password" 
                placeholder="Password" name="Password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e)=>{validatePassword(e.target.value)}}
                />
                {passwordError ? <div className="alarm"> {passwordError} </div> : <div className="alarm"></div>}

                
                <input  className={FormStyle.input} type="password" 
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={(e)=>{validateConfirmPassword(e.target.value)}}
                />
                {confirmPasswordError ? <div className="alarm"> {confirmPasswordError} </div> : <div className="alarm"></div>}

                
                <div className={FormStyle.dateContainer}>

                <label className={FormStyle.label} htmlFor="dob"> Date of Birth: </label>

                <input  className={FormStyle.input} type="date" 
                placeholder="Date of Birth" name="Date of Birth" 
                onChange={(e) => {handleAge(e.target.valueAsDate)}}
                onBlur={(e)=>{validateDOB(e.target.value)}}
                />
                {dateOfBirthError ? <div className="alarm"> {dateOfBirthError} </div> : <div className="alarm"></div>}

                </div>

                
                <select className={FormStyle.selectInput} onChange={handleGender}
                onBlur= {e => validateGender(e.target.value)}>
                <option value="" selected disabled hidden> Gender </option> 
                  {genderOptions.map(gen=>(
                    <option value={gen.value}>{gen.label}</option>
                  ))}
                </select>
                {genderError ? <div className="alarm"> {genderError} </div> : <div className="alarm"></div>}

                <button type="submit" className={FormStyle.btn}
                disabled={firstNameError || lastNameError || emailError || passwordError
                || confirmPasswordError || dateOfBirthError || genderError}> Register as Hiker </button>
            </form>
        </div>
    )
}

export default HikerRegisterForm
