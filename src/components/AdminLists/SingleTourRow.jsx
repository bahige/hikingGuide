import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import ListStyle from './ListStyle.module.css';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';


const SingleTourRow = (props) => {
    const {tourId, tourTitle, tourDate, tourOperator, openDeleteModal} = props;


    return (
        <div className={ListStyle.singleTourRow} key={tourId}>
            <div className={ListStyle.cell}>{tourTitle}</div>
            <div className={ListStyle.cell}><Moment format='dddd MMMM Do, YYYY'  date={tourDate}></Moment></div>
            <div className={ListStyle.cell}>{tourOperator}</div>
            <div className={`${ListStyle.buttonsContainer} ${ListStyle.cell}`}>
                <Link to={`toursList/${tourId}`}>
                <button className={ListStyle.editButton} type="submit">
                <FontAwesomeIcon icon={faEdit}/> Edit </button>
                </Link>
                <Link>
                <button className={ListStyle.deleteButton} type="submit" onClick={openDeleteModal}><FontAwesomeIcon icon={faTrash}/> Delete </button>
                </Link>
            </div>
        </div>
    )
}

export default SingleTourRow
