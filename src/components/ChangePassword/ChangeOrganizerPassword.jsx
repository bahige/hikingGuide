import React from 'react'
import FormStyle from '../SignInForms/SignInFormStyle.module.css';
import ChangePasswordForm from './ChangePasswordForm';
import { faBusAlt } from '@fortawesome/free-solid-svg-icons';


const ChangeOrganizerPassword = () => {
    return (
        <div className={FormStyle.container}>
            <ChangePasswordForm icon={faBusAlt} type="Tour Organizer"></ChangePasswordForm>     
        </div>
    )
}

export default ChangeOrganizerPassword
