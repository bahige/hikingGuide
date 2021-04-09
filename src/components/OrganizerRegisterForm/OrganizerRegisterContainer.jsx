import React from 'react';
import RegisterFormStyle from '../HikerRegisterForm/RegisterFormStyle.module.css';
import OrganizerRegisterForm from './OrganizerRegisterForm'

const OrganizerRegisterContainer = () => {

    const dateOfBirth = new Date(1983,8,5);
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear()

    console.log('age',age);

    return (
        <div className={RegisterFormStyle.orgRegContainer}>
            <OrganizerRegisterForm></OrganizerRegisterForm>
        </div>
    )
}

export default OrganizerRegisterContainer
