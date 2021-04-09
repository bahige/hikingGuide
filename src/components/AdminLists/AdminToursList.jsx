import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SingleTourRow from './SingleTourRow';
import {deleteTourByAdmin, listTours} from '../../redux/tour/tourActions';
import ListStyle from './ListStyle.module.css';
import Pagination from '../Pagination/Pagination';
import {Link} from 'react-router-dom';
import Modal from "react-modal";

Modal.setAppElement("#root");


const AdminToursList = () => {

    const toursData = useSelector(state => state.fetchTours);
    const {loading, tours, error, limit, count} = toursData;
    const deleteTourData = useSelector(state=> state.tourDeleteByAdmin);
    const {success: successDelete} = deleteTourData;

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(listTours());
    }, [successDelete]);

    const [postsPerPage, setPostsPerPage] = useState(limit);
    const [currentPage, setCurrentPage] = useState(1);
    const [tour, setTour] = useState();


    const handlePageChange = (currentPage) =>{
        setCurrentPage(currentPage);
        dispatch(listTours(currentPage, postsPerPage))
    }

    const deleteHandler = (tour) =>{
        dispatch(deleteTourByAdmin(tour._id));
        setModalVisible(false);
    }

    const [tourOperator, setTourOperator] = useState("Lebanese International Hikes");

            //////////////////////////////Modal Styling and Functions////////////////////////////////////
            const [modalVisible, setModalVisible] = useState(false);

            const openModal = (tour) => {
                setModalVisible(true);
                setTour(tour);
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
        {loading ? null
        : error ? null : 
        toursData && toursData.tours && 
        <div className={ListStyle.singleTourRow}><span>Tour Title</span>  <span>Tour Date</span> <span>Tour Operator</span> <span></span></div> }
        
        {loading ? <div> Loading ... </div>
        : error ? <div> Error: {error} </div> : 
        toursData && toursData.tours && tours.map((tour)=>
        <div>
        <SingleTourRow tourId={tour._id} tourTitle={tour.title} tourDate={tour.date}
        tourOperator={tourOperator} openDeleteModal={() => openModal(tour)}/>
        
        <Modal isOpen={modalVisible} 
            onRequestClose={()=>setModalVisible(false)}
            style={customStyles}>
            <div className={ListStyle.modal}>
                <div> Are you sure you want to delete this item? </div>
                <div className={ListStyle.buttonsContainer}>
                    <button className={ListStyle.editButton} onClick={()=> deleteHandler(tour)}> Delete </button>
                    <button className={ListStyle.deleteButton} onClick={()=> setModalVisible(false)}> Cancel </button>
                </div>
            </div>
        </Modal>
        
        </div> ) }


        <Pagination postsPerPage={limit} totalPosts={count} 
        paginate={(currentPage)=> handlePageChange(currentPage)} 
        currentPage={currentPage}></Pagination>

        </div>
    )
}

export default AdminToursList
