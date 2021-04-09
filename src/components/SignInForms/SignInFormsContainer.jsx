import React, { useEffect } from 'react'
import SignInStyle from './SignInFormStyle.module.css';
import UserSigninForm from './UserSigninForm';
import TourOrgSigninForm from './TourOrgSigninForm';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';



const SignInFormsContainer = () => {

    const userData = useSelector(state => state.signinUser);
    const {userInfo} =  userData; 

    const history = useHistory();

    useEffect(() => {
      if(userInfo && userInfo.token){
        history.push('/tours')
      } else if (!userInfo) {
        history.push('/')
      } 
       
    }, [userInfo])

    return (
        <div className={SignInStyle.container}>
            <UserSigninForm type="Hiker"  route="/register_hiker" 
            changePasswordRoute="/changePassword_hiker"></UserSigninForm>
            <TourOrgSigninForm type="Tour Organizer" route="/register_organizer"
            changePasswordRoute="/changePassword_organizer"></TourOrgSigninForm>
            
        </div>
    )
}

export default SignInFormsContainer
