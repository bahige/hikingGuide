import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SingleTourRow from './SingleTourRow';
import { listTours, listToursByOrganizer} from '../../redux/tour/tourActions';
import ListStyle from './ListStyle.module.css';
import Pagination from '../Pagination/Pagination';
import Modal from "react-modal";

Modal.setAppElement("#root");


const ToursListPerOrganizer = (props) => {

    const toursData = useSelector(state => state.fetchToursByOrganizer);
    const {loading, tours, error, limit, count} = toursData;

    const deleteTourData = useSelector(state=> state.tourDeleteByOrganizer);
    const {success: successDelete} = deleteTourData;

    const signinData = useSelector(state=> state.signinOrg);
    const {loading: loadingSignIn, organizer} = signinData;

    const [postsPerPage, setPostsPerPage] = useState(limit);
    const [currentPage, setCurrentPage] = useState(1);
    const [hideEditButton, setHideEditButton] = useState(true);
    const [tourId, setTourId] = useState();

    const [searchKeyword, setSearchKeyword] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        // if(organizer){
        dispatch(listToursByOrganizer(searchKeyword));}, [successDelete, organizer, searchKeyword]);




    const handlePageChange = (currentPage) =>{
        setCurrentPage(currentPage);
        dispatch(listTours(currentPage, postsPerPage))
    }

    const deleteHandler = () =>{
        // dispatch(deleteTourByTourOrganizer(tourId));
        setModalVisible(false);
    }

    const searchHandler = (e) => {
        e.preventDefault();
        setSearchKeyword(e.target.value);
        setCurrentPage(1);
        dispatch(listTours(searchKeyword, currentPage, postsPerPage));
    }

 //////////////////////////////Modal Styling and Functions////////////////////////////////////
 
            const [modalVisible, setModalVisible] = useState(false);

            const openModal = (tourId) => {
                setModalVisible(true);
                setTourId(tourId);
            }
        
            const customStyles = {
                content : {
                  top                   : '50%',
                  left                  : '50%',
                  right                 : 'auto',
                  bottom                : 'auto',
                  marginRight           : '-50%',
                  transform             : 'translate(-50%, -50%)'
                }
              };
        
        ///////////////////////////////////////////////////////////////////////////////////////////
    
    return (
        <div className={ListStyle.mainContainer}>
        
        <div className={ListStyle.filterContainer}> 

        <div>
                <i className={`fa fa-search`}/>
                <input className={ListStyle.input} type="search"  placeholder= "Search for Tours" onChange={searchHandler} />
        </div>
        </div>
        {loading ? null
        : error ? null : 
        toursData && toursData.tours && toursData.tours.length !==0  ?
        <div className={ListStyle.singleTourRow}><span>Tour Title</span>  
        <span>Tour Date</span> <span>Tour Operator</span> <span></span>
        </div> : null}
        
        {loading ? <div> Loading ... </div>
        : error ? <div> Error: {error} </div> : 
        toursData && toursData.tours && tours.map((tour)=>
        <div>
        <SingleTourRow tourId={tour._id} tourTitle={tour.title} tourDate={tour.date}
        tourOperator={tour.tourOperator.name} openDeleteModal={() => openModal(tour._id)}
        hideEditButton={hideEditButton}/>
        
        <Modal isOpen={modalVisible} 
            onRequestClose={()=>setModalVisible(false)}
            style={customStyles}>
            <div className={ListStyle.modal}>
                <div> Are you sure you want to delete this item? </div>
                <div className={ListStyle.buttonsContainer}>
                    <button className={ListStyle.editButton} onClick={deleteHandler}> Delete </button>
                    <button className={ListStyle.deleteButton} onClick={()=> setModalVisible(false)}> Cancel </button>
                </div>
            </div>
        </Modal>
        
        </div> ) }

        {toursData && toursData.tours && toursData.tours.length === 0 ? 
        <div className={ListStyle.warningMessage}>You did not create in any tours yet.</div> : null}

        <Pagination postsPerPage={limit} totalPosts={count} 
        paginate={(currentPage)=> handlePageChange(currentPage)} 
        currentPage={currentPage}></Pagination>

        </div>
    )
}

export default ToursListPerOrganizer;
