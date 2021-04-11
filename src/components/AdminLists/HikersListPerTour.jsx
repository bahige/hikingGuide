import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import ListStyle from './ListStyle.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import { listUsers, deleteUser } from '../../redux/user/userActions';
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

    // const [postsPerPage, setPostsPerPage] = useState(limit);
    // const [currentPage, setCurrentPage] = useState(1);


    // const handlePageChange = (currentPage) =>{
    //     setCurrentPage(currentPage);
    //     dispatch(listUsers(currentPage, postsPerPage))
    // }


    
    return ( 
        <div className={ListStyle.mainContainer}>
            <div className={ListStyle.titleRow}> List of Hikers of {tour.title}</div>

            {loading ? <div> loading ... </div> :
            error ? <div> Error :{error} </div> : 
            tourData && tourData.tour  && tour.hikers && (
                <div className={ListStyle.headingRow}>
                <div className={ListStyle.cell}>Hiker's Name</div>
                <div className={ListStyle.cell}>Hiker's Age</div>
                <div className={ListStyle.cell}>Hiker's Gender</div>
            </div>
            )}
 
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

            {/* <Pagination postsPerPage={limit} totalPosts={count} 
            paginate={(currentPage)=> handlePageChange(currentPage)} 
            currentPage={currentPage}></Pagination>   */}
            
            
             </div>
    )
}

export default HikersListPerTour
