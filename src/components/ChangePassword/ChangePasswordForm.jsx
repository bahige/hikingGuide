import React from 'react';
import FormStyle from '../SignInForms/SignInFormStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ChangePasswordForm = (props) => {
    const {icon, type} = props;


    const submitHandler = (e) => {
        e.preventDefault();
    //    dispatch(registerUser(name, email, password));
      };

    return (
        <div>
            <form className={FormStyle.form} onSubmit={submitHandler}>
                <div className={FormStyle.icon} >
                    <FontAwesomeIcon  icon={icon} />
                </div>
                <input type="email" placeholder="Email" className={FormStyle.input} required></input>
                <input type="password" placeholder="New Password" className={FormStyle.input} required></input>
                <input type="password" placeholder="Confirm New Password" className={FormStyle.input} required></input>
                <button type="submit" className={FormStyle.btn}> Change {type}'s Password </button>
            </form>
        </div>
    )
}

export default ChangePasswordForm
