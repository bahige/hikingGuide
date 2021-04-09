import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ListStyle from './ListStyle.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import { listUsers } from '../../redux/user/userActions';
import Pagination from '../Pagination/Pagination';
import { deleteTourOrganizer, listTourOrganizers } from '../../redux/organizer/organizerActions';
import Modal from 'react-modal';

Modal.setAppElement("#root");


const AdminTourOrganizersList = () => {

    const organizersData = useSelector(state => state.orgList);
    const {loading, tourOrganizers, limit, count, error} = organizersData;

    const deleteOrgData = useSelector(state => state.deleteOrganizer);
    const {success: successDelete} = deleteOrgData;

  
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(listTourOrganizers());
    }, [deleteOrgData])

    const [postsPerPage, setPostsPerPage] = useState(limit);
    const [currentPage, setCurrentPage] = useState(1);
    const [tourOrganizer, setTourOrganizer] = useState();

    const deleteHandler = (organizer) => {
        dispatch(deleteTourOrganizer(organizer._id));
        setModalVisible(false);
    }


    const handlePageChange = (currentPage) =>{
        setCurrentPage(currentPage);
        dispatch(listTourOrganizers(currentPage, postsPerPage))
    }

    //////////////////////////////Modal Styling and Functions////////////////////////////////////
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = (organizer) => {
        setModalVisible(true);
        setTourOrganizer(organizer)
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
        organizersData && organizersData.tourOrganizers && 
        <div className={ListStyle.singleTourRow}><span>Tour Organizer</span>  <span></span></div> }
            {loading ? <div> loading ... </div> :
            error ? <div> Error :{error} </div> : 
            organizersData &&  organizersData.tourOrganizers && tourOrganizers.map(tourOrganizer => (
                <div className={ListStyle.singleTourRow} key={tourOrganizer.id}>
                    <div className={ListStyle.cell}>{tourOrganizer.name}</div>
                    <div className={ListStyle.buttonsContainer}>
                    <Link to={`organizersList/${tourOrganizer._id}`}>
                        <button className={ListStyle.editButton}>
                        <FontAwesomeIcon icon={faInfo}/> Details </button>
                    </Link>
                    <Link>
                        <button className={ListStyle.deleteButton} onClick={() => openModal(tourOrganizer)}>
                        <FontAwesomeIcon icon={faTrash}/> Delete </button>
                    </Link>
                    </div>
                    <Modal isOpen={modalVisible} 
                    onRequestClose={()=>setModalVisible(false)}
                    style={customStyles}>
                    <div className={ListStyle.modal}>
                        <div> Are you sure you want to delete this item? </div>
                        <div className={ListStyle.buttonsContainer}>
                            <button className={ListStyle.editButton} onClick={() => deleteHandler(tourOrganizer)}> Delete </button>
                            <button className={ListStyle.deleteButton} onClick={()=> setModalVisible(false)}> Cancel </button>
                        </div>
                    </div>
                    </Modal>
                </div>
            ))}

            <Pagination postsPerPage={limit} totalPosts={count} 
            paginate={(currentPage)=> handlePageChange(currentPage)} 
            currentPage={currentPage}></Pagination>  

             </div>
    )
}

export default AdminTourOrganizersList
