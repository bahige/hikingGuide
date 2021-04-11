import React from 'react'
import {useSelector } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faHiking } from '@fortawesome/free-solid-svg-icons';
import ListStyle from './ListStyle.module.css';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';



const SingleTourRow = (props) => {
    const {tourId, tourTitle, tourDate, tourOperator, openDeleteModal, hideEditButton} = props;

    const regOrgData= useSelector(state => state.regOrganizer);
    const orgSignin= useSelector(state => state.signinOrg);

    const{orgInfo} = orgSignin;
    const{orgInfo : orgInfo1} = regOrgData;



    return (
        <div className={ListStyle.singleTourRow} key={tourId}>
            <div className={ListStyle.cell}>{tourTitle}</div>
            <div className={ListStyle.cell}><Moment format='dddd MMMM Do, YYYY'  date={tourDate}></Moment></div>
            <div className={ListStyle.cell}>{tourOperator}</div>
            <div className={`${ListStyle.buttonsContainer} ${ListStyle.cell}`}>
               { orgInfo || orgInfo1 ? <Link to={`hikersList/${tourId}`}>
                <button className={ListStyle.hikersButton} type="submit">
                <FontAwesomeIcon icon={faHiking}/> Hikers </button>
                </Link> : null }
                {hideEditButton ? <Link to={`toursList/${tourId}`}>
                <button className={ListStyle.editButton} type="submit">
                <FontAwesomeIcon icon={faEdit}/> Edit </button>
                </Link> : null}
                <Link>
                <button className={ListStyle.deleteButton} type="submit" onClick={openDeleteModal}><FontAwesomeIcon icon={faTrash}/> Delete </button>
                </Link>
            </div>
        </div>
    )
}

export default SingleTourRow
