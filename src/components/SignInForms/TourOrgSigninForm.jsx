import React, {useState, useEffect} from 'react';
import SignInFormStyle from './SignInFormStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory, Link } from 'react-router-dom';
import { faBusAlt } from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from 'react-redux';
import { signinOrganizer } from '../../redux/organizer/organizerActions';



const SignInForm = (props) => {
    const {type, route, changePasswordRoute, submitForm} = props;

    const history = useHistory();
    const handleClick = () => history.push(route);

    const [organizerEmail, setOrganizerEmail] = useState();
    const [organizerPassword, setOrganizerPassword] = useState();
    const [authenticated, setAuthenticated] = useState(false);

    const [emailErrors, setEmailErrors] = useState("");
    const [passwordErrors, setPasswordErrors] = useState("");

    const signinOrg = useSelector(state => state.signinOrg);
    const {loading, organizer, error: orgError, isAuthenticated} = signinOrg;

    const dispatch = useDispatch();

    useEffect(() => {
      if(organizer){
        history.push('/tours');
    } else {
        history.push('/'); 
    }
    }, [organizer])


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


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signinOrganizer(organizerEmail, organizerPassword));
      };

      

    return (
        <div>
            <form className={SignInFormStyle.form} onSubmit={submitHandler}>
                <div className={SignInFormStyle.icon} >
                <FontAwesomeIcon  icon={faBusAlt} />
                </div>
                <input type="email" placeholder="Email" className={SignInFormStyle.input} required
                onChange={e=>setOrganizerEmail(e.target.value)}
                ></input>

                <input type="password" placeholder="Password" className={SignInFormStyle.input} required
                onChange={e=>setOrganizerPassword(e.target.value)}
                ></input>

                {loading && <div>Loading...</div>}
                {orgError && orgError.message.includes("status code 401") && (
                    <div className="alert">
                        Either email or password are incorrect
                    </div> )}

                <button type="submit" className={SignInFormStyle.btn}
                disabled={emailErrors || passwordErrors}> Login As {type}</button>

                <div>
                    <Link to={changePasswordRoute}>
                        Forgot password? 
                    </Link>
                </div>
                <hr/>
                <button type="submit" onSubmit={submitForm} id={SignInFormStyle.regBtn}
                className={SignInFormStyle.btn} onClick={handleClick}> Register As {type}</button>
            </form>
        </div>
    )
}

export default SignInForm
