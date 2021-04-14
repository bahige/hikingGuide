import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ListStyle from './ListStyle.module.css';
import {useHistory} from 'react-router-dom';
import { fetchSingleUser } from '../../redux/user/userActions';


const UserProfile = (props) => {


    const userData = useSelector(state => state.singleUser);
    const {loading, user, error} = userData;
    const userUpdate = useSelector(state => state.userUpdate);
    const {success} = userUpdate;

    const dispatch = useDispatch();
    const history = useHistory();

    const clickHandler = () =>{
        history.push(`${props.match.params.userId}/userEditForm`);
    }

    useEffect(() => {
        dispatch (fetchSingleUser(props.match.params.userId));
    }, [success])

    return (
        <div>
            {loading ? <div> Loading </div> : error ? <div> Error: {error} </div> : user ?
                <div className={ListStyle.singleTourRow}>
                    <div className={ListStyle.infoDetails}>
                        <div> <u> {user.firstName} {user.lastName} </u></div>
                        <div> Email: {user.email} </div>
                        <div> Age: {user.age} </div>
                        <div> Gender: {user.gender} </div>
                        <button className={ListStyle.btn}  onClick={clickHandler}> Edit User </button>
                    </div>
                </div> : null}
        </div>
    )
}

export default UserProfile
