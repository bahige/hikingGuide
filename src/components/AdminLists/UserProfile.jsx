import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ListStyle from './ListStyle.module.css';
import {useHistory} from 'react-router-dom';


const UserProfile = (props) => {

    const userId = props.match.params.userId;

    const signinUser = useSelector(state => state.signinUser);
    const {loading, userInfo, error} = signinUser;
    console.log(signinUser);

    const history = useHistory();

    const clickHandler = () =>{
        history.push(`${userId}/userEditForm`);
    }



    return (
        <div>
            {loading ? <div> Loading </div> : error ? <div> Error: {error} </div> : userInfo ?
                <div className={ListStyle.singleTourRow}>
                    <div className={ListStyle.infoDetails}>
                        <div> <u> {userInfo.firstName} {userInfo.lastName} </u></div>
                        <div> Email: {userInfo.email} </div>
                        <div> Age: {userInfo.age} </div>
                        <div> Gender: {userInfo.gender} </div>
                        <button className={ListStyle.btn}  onClick={clickHandler}> Edit User </button>
                    </div>
                </div> : null}
        </div>
    )
}

export default UserProfile
