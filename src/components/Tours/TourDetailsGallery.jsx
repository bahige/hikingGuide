import React from 'react'
import ImageGallery from './DetailsGallery.module.css'



const TourDetailsGallery = (props) => {

    const {profileImage, price, priceForMinors, priceForUnivStudents, priceForGroups, 
    priceNoTransp, includesBreakfast, includesSnacks, includesGuides, includesInsurance,
includesSnowshoes} = props;
    return (
        <div id={ImageGallery.imgContainer}>

            <div id={ImageGallery.profileImage}>
            <img src={profileImage} alt="image"/>
            </div>

            {/* <div id={ImageGallery.imageGallery}>
            <img src={profileImage} alt="image"/>
            <img src={profileImage} alt="image"/>
            <img src={profileImage} alt="image"/>
            <img src={profileImage} alt="image"/>
            </div> */}

<div className={ImageGallery.infoDetailsRow}>

<div className={ImageGallery.detailsCol}>
        <div className={ImageGallery.secondaryTag}><b><u>Prices With Transportation: </u></b> </div>
        <div className={ImageGallery.secondaryTag}><b><u>Adults:</u></b> {price} LBP </div>
        <div className={ImageGallery.secondaryTag}><b><u>Minors:</u></b> {priceForMinors} LBP </div>
        <div className={ImageGallery.secondaryTag}><b><u>University Students:</u></b> {priceForUnivStudents} LBP </div>
        <div className={ImageGallery.secondaryTag}><b><u>Group of 5 and more:</u></b> {priceForGroups} LBP </div>
        <div className={ImageGallery.secondaryTag}><b><u>W/O Transportation:</u></b> Discount {priceNoTransp} LBP </div>
</div>

<div className={ImageGallery.detailsCol}>
    <div className={ImageGallery.secondaryTag}><b><u>Includes: </u></b> </div>
    <div className={ImageGallery.secondaryTag}><b><u>Guides:</u></b> {includesGuides ? <span>Yes</span> :<span>No</span> }</div>            
    <div className={ImageGallery.secondaryTag}><b><u>Breakfast:</u></b> {includesBreakfast ? <span>Yes</span> :<span>No</span> } </div>
    <div className={ImageGallery.secondaryTag}><b><u>Snacks:</u></b> {includesSnacks ? <span>Yes</span> :<span>No</span> } </div>
    <div className={ImageGallery.secondaryTag}><b><u>Insurance:</u></b>: {includesInsurance ? <span>Yes</span> :<span>No</span> } </div>
    <div className={ImageGallery.secondaryTag}><b><u>Snowshoes:</u></b>: {includesSnowshoes ? <span>Yes</span> :<span>No</span> } </div>
</div>     
</div>
 

        </div>
    )
}

export default TourDetailsGallery
