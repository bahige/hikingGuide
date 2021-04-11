import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SingleTourRow from './SingleTourRow';
import {deleteTourByTourOrganizer, listTours, listToursByOrganizer, showToursOfHiker} from '../../redux/tour/tourActions';
import ListStyle from './ListStyle.module.css';
import Pagination from '../Pagination/Pagination';
import {Link} from 'react-router-dom';
import Modal from "react-modal";

Modal.setAppElement("#root");


const ToursListPerUser = (props) => {

    const toursData = useSelector(state => state.fetchToursByHiker);
    const {loading, tours, error, limit, count} = toursData;
    console.log("data", toursData);


    const signinData = useSelector(state=> state.signinUser);
    const {loading: loadingSignIn, userInfo} = signinData;
    console.log("userInfo", userInfo);

    const [postsPerPage, setPostsPerPage] = useState(limit);
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        // if(organizer){
        dispatch(showToursOfHiker());
    }, []);




    const handlePageChange = (currentPage) =>{
        setCurrentPage(currentPage);
        dispatch(listTours(currentPage, postsPerPage))
    }


 
    
    return (
        <div className={ListStyle.mainContainer}>
        
  
        {loading ? null
        : error ? null : 
        toursData && toursData.tours && toursData.tours.length !==0 ?
        <div className={ListStyle.singleTourRow}>
            <span>Tour Title</span>  <span>Tour Date</span> <span>Tour Operator</span> <span></span>
        </div> : null }
        
        {loading ? <div> Loading ... </div>
        : error ? <div> Error: {error} </div> : 
        toursData && toursData.tours && tours.map((tour)=>
        <div>
        <SingleTourRow tourId={tour._id} tourTitle={tour.title} tourDate={tour.date}
        tourOperator={tour.tourOperator.name}/>
          
        </div> ) }

        {toursData && toursData.tours && toursData.tours.length===0 ? 
        <div className={ListStyle.warningMessage}>You did not register in any tour.</div> : null}

        <Pagination postsPerPage={limit} totalPosts={count} 
        paginate={(currentPage)=> handlePageChange(currentPage)} 
        currentPage={currentPage}></Pagination>

        </div>
    )
}

export default ToursListPerUser;
