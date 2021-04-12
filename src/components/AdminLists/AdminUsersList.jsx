import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import ListStyle from './ListStyle.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import { listUsers, deleteUser } from '../../redux/user/userActions';
import Pagination from '../Pagination/Pagination';
import Modal from "react-modal";

Modal.setAppElement("#root");


const AdminUsersList = () => {

    const userData = useSelector(state => state.usersList);
    const {loading, users, count, limit, error} = userData;

    const deletedUserData = useSelector(state=> state.userDelete);
    const { success: deleteSuccess} = deletedUserData;

    const dispatch = useDispatch();

    const [postsPerPage, setPostsPerPage] = useState(limit);
    const [currentPage, setCurrentPage] = useState(1);
    const [userId, setUserId] = useState();

    useEffect(() => {
       dispatch(listUsers());
       setCurrentPage(1);
    }, [deleteSuccess])

  


    const handlePageChange = (currentPage) =>{
        setCurrentPage(currentPage);
        dispatch(listUsers(currentPage, postsPerPage))
    }


        //////////////////////////////Delete Function////////////////////////////////////

        const deleteHandler = () => {
            dispatch(deleteUser(userId));
            setModalVisible(false);
        }

        //////////////////////////////Modal Styling and Functions////////////////////////////////////
        const [modalVisible, setModalVisible] = useState(false);

        const openModal = (userId) => {
            setModalVisible(true);
            setUserId(userId);
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
            
            <div className={ListStyle.titleRow}> List of All Registered Users </div>

 
            {loading ? <div> loading ... </div> :
            error ? <div> Error :{error} </div> : 
            userData && userData.users  && users.map(user => (
            <table>
                <div className={ListStyle.singleTourRow} key={user._id}>
                    <div className={ListStyle.cell}>{`${user.firstName}  ${user.lastName}`}</div>
                    <div>
                    <Link>
                    <button className={ListStyle.deleteButton} onClick={() =>  openModal(user._id)}>
                    <FontAwesomeIcon icon={faTrash}/> Delete </button>
                    </Link>
                    </div>
                    <Modal isOpen={modalVisible} 
                        onRequestClose={()=>setModalVisible(false)}
                        style={customStyles}>
                    <div className={ListStyle.modal}>
                        <div> Are you sure you want to delete this item? </div>
                        <div className={ListStyle.buttonsContainer}>
                            <button className={ListStyle.editButton} onClick={deleteHandler} > Delete </button>
                            <button className={ListStyle.deleteButton} onClick={()=> setModalVisible(false)}> Cancel </button>
                        </div>
                    </div>
                    </Modal>
                </div>
             </table>))}

            <Pagination postsPerPage={limit} totalPosts={count} 
            paginate={(currentPage)=> handlePageChange(currentPage)} 
            currentPage={currentPage}></Pagination>  
            
            
             </div>
    )
}

export default AdminUsersList
