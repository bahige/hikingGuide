import React from 'react'
import FormStyle from '../SignInForms/SignInFormStyle.module.css';
import ChangePasswordForm from './ChangePasswordForm';
import { faHiking } from '@fortawesome/free-solid-svg-icons';



const ChangeHikerPassword = () => {
    return (
        <div className={FormStyle.container}>
            <ChangePasswordForm icon={faHiking} type="Hiker"></ChangePasswordForm>
        </div>
    )
}

export default ChangeHikerPassword
