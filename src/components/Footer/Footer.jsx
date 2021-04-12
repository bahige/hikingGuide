import React from 'react';
import logo from '../../assets/images/hikeguide.png';
import appleStore from '../../assets/images/app-store.png';
import playStore from '../../assets/images/play-store.png';
import FooterStyle from './Footer.module.css';

const Footer = () => {
    return (
        <div className={FooterStyle.mainContainer}>
            <div className={FooterStyle.firstRow}>
            <div className={FooterStyle.col1}>
                <h3> Download Our App </h3>
                <p> Download our app for both Android and IOS mobile phones</p>
                <div className={FooterStyle.imgRow}>
                    <img src={playStore} alt="playstore"/>
                    <img src={appleStore} alt="applestore"/>
                </div>
            </div>

            <div  className={FooterStyle.col2}>
                <img src={logo} alt="logo"/>
                <i> HikeGuide .... where unforgettable memories are created...</i>
                <p> Our objective is to unite nature lovers in unforgettable hikes that make us appreciate
                    our beautiful planet and create awareness about protecting it.
                </p>
            </div>

            <div  className={FooterStyle.col3}>
                    <h3> Useful Links </h3>
                    <p> Blog </p>
                    <p> FAQs </p>
                    <p> Contact Us </p>

            </div>
            </div>

            <hr/>
            <div>
                <p>Copyright (c) 2021 - HikeGuide</p>
            </div>

        </div>
    )
}

export default Footer
