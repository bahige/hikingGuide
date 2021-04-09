import React from 'react';
import RegisterFormStyle from './RegisterFormStyle.module.css';
import HikerRegisterForm from './HikerRegisterForm';

const HikerRegisterContainer = () => {
    return (
        <div className={RegisterFormStyle.hikerRegContainer}>
         <HikerRegisterForm></HikerRegisterForm>                
        </div>
    )
}

export default HikerRegisterContainer
