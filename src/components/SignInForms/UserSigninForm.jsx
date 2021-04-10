import React, {useState, useEffect} from 'react';
import SignInFormStyle from './SignInFormStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory, Link } from 'react-router-dom';
import { faHiking } from '@fortawesome/free-solid-svg-icons';
import { signinUser } from '../../redux/user/userActions';
import {useSelector, useDispatch} from 'react-redux';


const SignInForm = (props) => {
    const {type, route, changePasswordRoute, submitForm} = props;

    const history = useHistory();
    const handleClick = () => history.push(route);

    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const [authenticated, setAuthenticated] = useState(false);

    const [emailErrors, setEmailErrors] = useState("");
    const [passwordErrors, setPasswordErrors] = useState("");

    
    const userData = useSelector(state => state.signinUser);
    const {loading, userInfo, error } = userData;

    const dispatch = useDispatch();

    useEffect(() => {
      if(userInfo){
        history.push('/tours');
    } else {
        history.push('/'); 
    }
    }, [userInfo])



    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signinUser(userEmail, userPassword));
      };

      const validateEmail = (email) => {
        let errors = "";
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!email) {
          errors = "Required";
        } else if (!emailRegex.test(email)) {
          errors = "Invalid email address";
        }
        setEmailErrors(errors);
      };
    
      const validatePassword = (password) => {
        let errors = "";
        const passwordRegex = /(?=.*[0-9])/;
        if (!password) {
          errors = "Required";
        } else if (password.length < 8) {
          errors = "Password must be 8 characters long.";
        } else if (!passwordRegex.test(password)) {
          errors = "Invalid password. Must contain one number";
        }
        setPasswordErrors(errors);
      };



//    const redirect = props.location.search
//       ? props.location.search.split("=")[1]
//       : "/tours";



    return (
        <div>
            <form className={SignInFormStyle.form} onSubmit={submitHandler}>
                <div className={SignInFormStyle.icon} >
                <FontAwesomeIcon  icon={faHiking} />
                </div>
                <input type="email" placeholder="Email" className={SignInFormStyle.input} required
                onChange={e=>setUserEmail(e.target.value)}></input>

                <input type="password" placeholder="Password" className={SignInFormStyle.input} required
                onChange={e=>setUserPassword(e.target.value)}></input>

                {loading && <div>Loading...</div>}
                {error && error.message.includes("status code 401") && (
                    <div className="alert">
                        Either email or password are incorrect
                    </div> )}

                <button type="submit" className={SignInFormStyle.btn} onSubmit={submitHandler}
                disabled={emailErrors || passwordErrors}> Login As {type}</button>

                <div>
                    <Link to={changePasswordRoute}>
                        Forgot password? 
                    </Link>
                </div>
                <hr/>
                <button type="submit" className={`${SignInFormStyle.regBtn} ${SignInFormStyle.btn}`}
                onClick={handleClick}> Register As {type}</button>
            </form>
        </div>
    )
}

export default SignInForm
