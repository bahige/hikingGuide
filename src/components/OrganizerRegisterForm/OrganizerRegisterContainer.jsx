import React from 'react';
import RegisterFormStyle from '../HikerRegisterForm/RegisterFormStyle.module.css';
import OrganizerRegisterForm from './OrganizerRegisterForm'

const OrganizerRegisterContainer = () => {


    return (
        <div className={RegisterFormStyle.orgRegContainer}>
            <OrganizerRegisterForm></OrganizerRegisterForm>
        </div>
    )
}

export default OrganizerRegisterContainer
