import React, {useEffect, useState} from 'react';
import FormStyle from '../HikerRegisterForm/RegisterFormStyle.module.css';
import TimeAndMeetingVenueForm from './TimeAndMeetingVenueForm';
import PriceInclusionsForm from './PriceInclusionsForm';

import { useSelector, useDispatch } from 'react-redux';
import { createOrUpdateTour, singleTourDetails } from '../../redux/tour/tourActions';
import HikeInfoForm from './HikeInfoForm';
import PricesForm from './PricesForm';
import DetailsForm from './DetailsForm';
import IntroductionForm from './IntroductionForm';
import DestinationForm from './DestinationForm';
import {useHistory} from 'react-router-dom';



const TourForm = (props) => {

    const {idOfTour} = props;
    // Defining the input values of the form
    const [id, setId]=useState();
    const [tourTitle, setTourTitle] = useState();
    const [profileImage, setProfileImage] = useState();
    const [tourType, setTourType] = useState();

    const [destination, setDestination] = useState();
    const [distanceFromMeetingVenue, setDistanceFromMeetingVenue] = useState(0);
    const [heightAboveSeaLevel, setHeightAboveSeaLevel] = useState(0);
    const [district, setDistrict] = useState();
    const [governorate, setGovernorate] = useState();

    const [date, setDate] = useState();
    const [departureTime, setDepartureTime] = useState();
    const [returningTime, setReturningTime] = useState();
    const [meetingVenue, setMeetingVenue] = useState();
    const [meetingVenueLink, setMeetingVenueLink] = useState("Not Applicable");

    const [hikingLevel, setHikingLevel] = useState(0);
    const [hikingDistance, setHikingDistance] = useState(0);
    const [uphillHeight, setUphillHeight] = useState(0);
    const [downhillHeight, setDownhillHeight] = useState(0);
    const [isFamilyFriendly, setIsFamilyFriendly] = useState(false);

    const [priceForAdults, setPriceForAdults] = useState(0);
    const [priceForMinors, setPriceForMinors] = useState(0);
    const [priceForUnivStudents, setPriceForUnivStudents] = useState(0);
    const [priceForGroups, setPriceForGroups] = useState(0);
    const [priceNoTransp, setPriceNoTransp] = useState(0);

    const [includesGuides, setIncludesGuides] = useState(false);
    const [includesBreakfast, setIncludesBreakfast] = useState(false);
    const [includesSnacks, setIncludesSnacks] = useState(false);
    const [includesInsurance, setIncludesInsurance] = useState(false);
    const [includesSnowshoes, setIncludesSnowshoes] = useState(false);

    const [description, setDescription] = useState();
    const [rules, setRules] = useState("Not Applicable");
    const [whatToBring, setWhatToBring] = useState("Not Applicable");
    const [paymentTerms, setPaymentTerms] = useState("Not Applicable");

    const history = useHistory();

    // Checking if the id exists to determine if the form is for creating or updating

    const tourId = props.match.params.id ? props.match.params.id : '';

    const handleTourId =() =>{
        if(tourId){
            setId(tourId);
        }
    }


    // Accessing and dispatching actions from the redux store
    const dataSingleTour = useSelector(state => state.fetchTourDetails);
    const {loading, tour, error} = dataSingleTour;

    const tourData = useSelector(state => state.tourSave);
    const {loading: loadingCreate, tour:tourCreated, error: errorCreate} =tourData;
    const dispatch = useDispatch();


    useEffect(() => {
        handleTourId();
        dispatch(singleTourDetails(tourId))
        console.log("tourId", tourId)

    }, [])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createOrUpdateTour({
            _id: id,
            title: tourTitle,
            profileImage: profileImage,
            tourType: tourType,
            destination: destination,
            district: district,
            governorate: governorate,
            distanceFromDeparturePoint:distanceFromMeetingVenue,
            heightAboveSeaLevel: heightAboveSeaLevel,
            date: date,
            departureTime: departureTime,
            returningTime: returningTime,
            meetingPoint: meetingVenue,
            meetingVenueLink: meetingVenueLink,
            hikingLevel: hikingLevel,
            hikingDistance: hikingDistance,
            uphillHeight: uphillHeight,
            downhillHeight: downhillHeight,
            isFamilyFriendly: isFamilyFriendly,
            price: priceForAdults,
            priceForMinors: priceForMinors,
            priceForGroups: priceForGroups,
            priceForUnivStudents: priceForUnivStudents,
            priceNoTransp: priceNoTransp,
            includesBreakfast: includesBreakfast,
            includesGuides: includesGuides,
            includesSnacks: includesSnacks,
            includesSnowshoes: includesSnowshoes,
            includesInsurance: includesInsurance,
            description: description,
            rules: rules,
            whatToBring: whatToBring,
            paymentTerms: paymentTerms
        }))
        history.push('/tours');
    }


    //Handling the changes in form input elements

    const handleTourTitle = (title) =>{
        setTourTitle(title)
    }

    const handleProfileImage = (image) =>{
        setProfileImage(image)
    }

    const handleTourType = (type) =>{
        setTourType(type)
    }

    /*************************************************************************** */

    const handleDestination = (destination) =>{
        setDestination(destination)
    }
   

    const handleDistrict = (dist) =>{
        setDistrict(dist);
        console.log("district from tourForm",district);
    }


    const handleGovernorate = (gov) =>{
        setGovernorate(gov);
        console.log("gov from tourForm",governorate);
    }

    const handleDistanceFromMeetingVenue = (distance) =>{
        setDistanceFromMeetingVenue(distance)
    }

    const handleHeightAboveSeaLevel = (height) =>{
        setHeightAboveSeaLevel(height)
    }


   /******************************************************************** */

    const handleMeetingVenue = (venue) =>{
        setMeetingVenue(venue)
    }

    const handleMeetingVenueLink = (link) =>{
        setMeetingVenueLink(link)
    }

    const handleDate = (date) =>{
        setDate(date)
    }
    
    const handleDepartureTime = (time) =>{
        setDepartureTime(time)
    }

    const handleReturningTime = (time) =>{
        setReturningTime(time)
    }

   /******************************************************************** */

   const handleIsFamilyFriendly = (option) =>{
    setIsFamilyFriendly(option)
}

const handleHikingLevel = (level) =>{
    setHikingLevel(level)
}

const handleHikingDistance = (distance) =>{
    setHikingDistance(distance)
}

const handleUphillHeight = (height) =>{
    setUphillHeight(height)
}

const handleDownhillHeight = (height) =>{
    setDownhillHeight(height)
}


/******************************************************************** */

   const handlePriceForAdults = (price) =>{
    setPriceForAdults(price)
}

const handlePriceForMinors = (price) =>{
    setPriceForMinors(price)
}

const handlePriceForUnivStudents = (price) =>{
    setPriceForUnivStudents(price)
}

const handlePriceForGroups = (price) =>{
    setPriceForGroups(price)
}

const handlePriceNoTransp = (price) =>{
    setPriceNoTransp(price)
}

/******************************************************************** */

   const handleIncludesBreakfast = (option) =>{
    setIncludesBreakfast(option)
    }

    const handleIncludesGuides = (option) =>{
        setIncludesGuides(option)
    }

    const handleIncludesSnacks = (option) =>{
        setIncludesSnacks(option)
    }

    const handleIncludesInsurance = (option) =>{
        setIncludesInsurance(option)
    }

    const handleIncludesSnowshoes = (option) =>{
        setIncludesSnowshoes(option)
    }

/******************************************************************** */

const handleDescription = (description) =>{
    setDescription(description)
    }

    const handleRules = (rules) =>{
        setRules(rules)
    }

    const handleWhatToBring = (details) =>{
        setWhatToBring(details)
    }

    const handlePaymentTerms= (terms) =>{
        setPaymentTerms(terms)
    }

/******************** Animations for the Form********************************* */

    const hideFormBlock=(element) => {
        element.style.visibility = "hidden";
    }

    const hideRemainingBlock = () =>{
        const blockDivs = document.getElementsByClassName('blockClass');
        const blocks = Array.from(blockDivs);
        blocks.forEach(hideFormBlock);
    }

    const showIntroBlock = () =>{
        hideRemainingBlock();
        document.getElementById('introSubform').style.visibility= "visible";
    }

    const showDestBlock = () =>{
        hideRemainingBlock();
        document.getElementById('destSubform').style.visibility= "visible";
    }

    const showVenueBlock = () =>{
        hideRemainingBlock();
        document.getElementById('venueSubform').style.visibility= "visible";
    }

    const showHikeInfoBlock = () =>{
        hideRemainingBlock();
        document.getElementById('hikeInfoSubform').style.visibility= "visible";
    }

    const showPricesBlock = () =>{
        hideRemainingBlock();
        document.getElementById('pricesSubform').style.visibility= "visible";
    }

    const showPriceInclusionsBlock = () =>{
        hideRemainingBlock();
        document.getElementById('priceInclusionsSubform').style.visibility= "visible";
    }

    const showDetailsBlock = () =>{
        hideRemainingBlock();
        document.getElementById('detailsSubform').style.visibility= "visible";
    }


    return (
        <div className={FormStyle.hikerRegContainer}>
            {loadingCreate && <div> Loading</div>}
            { errorCreate && <div> Error : {errorCreate} </div> }
                <form id="formContainer" onSubmit={submitHandler} >
                <div className={FormStyle.tourForm}>

                <div id="detailsSubform" className={`${FormStyle.subform} blockClass`}>
                <DetailsForm tour={tour} tourId={tourId}  prevBlock= {showPriceInclusionsBlock}
                description={description} paymentTerms={paymentTerms} rules={rules} whatToBring={whatToBring}
                changeDescription={handleDescription} changeRules={handleRules} 
                changeWhatToBring= {handleWhatToBring} changePaymentTerms={handlePaymentTerms} />
                </div>
  
                <div id="priceInclusionsSubform" className={`${FormStyle.subform} blockClass`}>
                <PriceInclusionsForm tour={tour}  tourId={tourId} nextBlock= {showDetailsBlock}  
                prevBlock= {showPricesBlock}
                includesBreakfast={includesBreakfast} includesGuides={includesGuides}
                includesSnacks={includesSnacks} includesSnowshoes={includesSnowshoes} 
                includesInsurance={includesInsurance} changeIncludesBreakfast={handleIncludesBreakfast}
                changeIncludesSnacks={handleIncludesSnacks} changeIncludesInsurance={handleIncludesInsurance}
                changeIncludesGuides={handleIncludesGuides} changeIncludesSnowshoes={handleIncludesSnowshoes}/>
                </div>

                <div id="pricesSubform" className={`${FormStyle.subform} blockClass`}>
                <PricesForm tour={tour} tourId={tourId} nextBlock= {showPriceInclusionsBlock}  
                prevBlock= {showHikeInfoBlock}
                priceForAdults={priceForAdults} priceForMinors={priceForMinors} 
                priceForGroups={priceForGroups} priceForUnivStudents={priceForUnivStudents} 
                priceNoTransp={priceNoTransp}
                changePriceForAdults={handlePriceForAdults} changePriceForMinors={handlePriceForMinors}
                changePriceForGroups={handlePriceForGroups} changePriceNoTransp={handlePriceNoTransp}
                changePriceForUnivStudents={handlePriceForUnivStudents}/>
                </div>

                <div id="hikeInfoSubform" className={`${FormStyle.subform} blockClass`}>
                <HikeInfoForm tour={tour} tourId={tourId} nextBlock= {showPricesBlock}  
                prevBlock= {showVenueBlock}
                isFamilyFriendly={isFamilyFriendly} hikingLevel={hikingLevel} hikingDistance={hikingDistance}
                downhillHeight={downhillHeight} uphillHeight={uphillHeight}
                changeIsFamilyFriendly={handleIsFamilyFriendly} changeHikingLevel={handleHikingLevel}
                changeHikingDistance={handleHikingDistance} changeUphillHeight={handleUphillHeight}
                changeDownhillHeight={handleDownhillHeight}/>
                </div>

                <div id="venueSubform" className={`${FormStyle.subform} blockClass`}>
                <TimeAndMeetingVenueForm tour={tour} tourId={tourId} 
                meetingVenue={meetingVenue} meetingVenueLink={meetingVenueLink}
                date={date} departureTime={departureTime} returningTime={returningTime}
                changeMeetingVenue ={handleMeetingVenue} changeMeetingVenueLink={handleMeetingVenueLink}
                changeDate={handleDate} changeDepTime={handleDepartureTime} changeRetTime={handleReturningTime}
                nextBlock= {showHikeInfoBlock}  prevBlock= {showDestBlock}
                />
                </div>

                <div id="destSubform" className={`${FormStyle.subform} blockClass`}>
                <DestinationForm tour={tour} tourId={tourId} nextBlock= {showVenueBlock}  
                prevBlock= {showIntroBlock}
                destination={destination} district={district} governorate={governorate}
                distanceFromMeetingVenue={distanceFromMeetingVenue} heightAboveSeaLevel={heightAboveSeaLevel}
                changeDestination= {handleDestination} changeDistrict={handleDistrict} changeGov= {handleGovernorate}
                changeDistanceFromMeetingVenue={handleDistanceFromMeetingVenue} changeHeightAboveSeaLevel={handleHeightAboveSeaLevel}/>
                </div>

                <div id="introSubform" className={`${FormStyle.subform} blockClass`}>
                <IntroductionForm tour={tour} tourId={tourId} nextBlock= {showDestBlock}
                tourTitle={tourTitle} profileImage={profileImage} tourType ={tourType}
                changeTourTitle={handleTourTitle} changeProfileImage={handleProfileImage} 
                changeTourType={handleTourType}/>
                </div>

                </div>
            </form>                
        </div>
    )
}

export default TourForm
