import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ListStyle from './ListStyle.module.css';
import Pagination from '../Pagination/Pagination';
import Modal from "react-modal";
import { singleTourDetails } from '../../redux/tour/tourActions';

Modal.setAppElement("#root");


const HikersListPerTour = (props) => {

    const tourData = useSelector(state => state.fetchTourDetails);
    const {loading, tour, error} = tourData; 


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(singleTourDetails(props.match.params.tourId));
    }, [])

    const nrOfHikers = tour && tour.hikers && tour.hikers.length;
    const [postsPerPage, setPostsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);


    const handlePageChange = (currentPage) =>{
        setCurrentPage(currentPage);
    }


    
    return ( 
        <div className={ListStyle.mainContainer}>

            { tourData && tourData.tour  && tour.hikers && tour.hikers.length !== 0 ?
                <div className={ListStyle.titleRow}> List of Hikers of {tour.title}</div> : null }
                
            {loading ? <div> loading ... </div> :
            error ? <div> Error :{error} </div> : 
            tourData && tourData.tour  && tour.hikers && tour.hikers.length !== 0 ?(
                <div className={ListStyle.headingRow}>
                <div className={ListStyle.cell}>Hiker's Name</div>
                <div className={ListStyle.cell}>Hiker's Age</div>
                <div className={ListStyle.cell}>Hiker's Gender</div>
            </div>
            ) : null}

            {tourData && tourData.tour  && tour.hikers && tour.hikers.length === 0 ?
            (<div className={ListStyle.warningMessage}> No Hikers Registered in this Tour. </div>) : null}
 
            {loading ? <div> loading ... </div> :
            error ? <div> Error :{error} </div> : 
            tourData && tourData.tour  && tour.hikers &&  tour.hikers.map(hiker => (
            <table>
                <div className={ListStyle.singleTourRow} key={hiker._id}>
                    <div className={ListStyle.cell}>{`${hiker.firstName}  ${hiker.lastName}`}</div>
                    <div className={ListStyle.cell}>{hiker.age}</div>
                    <div className={ListStyle.cell}>{hiker.gender}</div>
                </div>
             </table>))}

            <Pagination postsPerPage={postsPerPage} totalPosts={nrOfHikers} 
            paginate={(currentPage)=> handlePageChange(currentPage)} 
            currentPage={currentPage}></Pagination>  
            
            
             </div>
    )
}

export default HikersListPerTour
