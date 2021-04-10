import React, { useEffect, useState } from 'react';
import HeaderStyle from './Header.module.css';
import Logo from '../../assets/images/hikeguide.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { faYoutubeSquare } from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons';

import {useHistory, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../../redux/user/userActions';
import { signOutOrganizer } from '../../redux/organizer/organizerActions';


const Header = () => {

    const [displayMenu, setDisplayMenu] = useState(HeaderStyle.hideMenu);
    const [toggle, setToggle] = useState({toggle:false});

    const userData = useSelector(state => state.signinUser);
    const regUserData = useSelector(state => state.registerUser);
    const {userInfo} =  userData; 
    const {userInfo : userInfo1} =  regUserData; 

    const regOrgData= useSelector(state => state.regOrganizer);
    const orgSignin= useSelector(state => state.signinOrg);

    const{orgInfo} = orgSignin;
    const{orgInfo : orgInfo1} = regOrgData;

    const dispatch = useDispatch();
    const history = useHistory();

    const menuToggle = () =>{
        setToggle(prevState => {
          return  {toggle: !prevState.toggle}
        })
        toggle.toggle ? setDisplayMenu(HeaderStyle.displayMenu) : setDisplayMenu(HeaderStyle.hideMenu);
    }

    const userSignOut = () => {
        dispatch(signOutUser());
        if(userInfo || userInfo1){
            history.push('/tours');
        } else {
            history.push('/'); 
        }
    }

    const orgSignOut= () => {
        dispatch(signOutOrganizer());
        if(orgInfo|| orgInfo1){
            history.push('/tours');
        } else {
            history.push('/'); 
        }
    }


    return (
        <div>
            <div className={HeaderStyle.header}>
                <div className={HeaderStyle.leftHeader}>
                        <Link to ='/'>
                        <img src={Logo} alt="HikeGuide" width="100px" height="100px"/>
                        </Link>
                            <FontAwesomeIcon className={HeaderStyle.icon} icon={faFacebookSquare}/>
                            <FontAwesomeIcon className={HeaderStyle.icon} icon={faInstagramSquare}/>
                            <FontAwesomeIcon className={HeaderStyle.icon} icon={faTwitterSquare}/>
                            <FontAwesomeIcon className={HeaderStyle.icon} icon={faYoutubeSquare}/>
                </div>
                
                <div className={HeaderStyle.rightHeader}>
                <nav>
                    <ul className={displayMenu}>
                    { userInfo && userInfo.token || userInfo1 && userInfo1.token 
                    || orgInfo && orgInfo.token || orgInfo1 && orgInfo1.token  ? null :
                        <li>
                            <Link to="/">
                                <div> Home </div>
                            </Link>
                        </li> 
                        } 

                        <li>
                            <Link to="/tours">
                            <div> Tours </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/organizers">
                            <div> Tour Organizers </div>
                            </Link>
                        </li>

                    { orgInfo && orgInfo.token || orgInfo1 && orgInfo1.token ? 
                        <li>
                            <Link to={`/createTour`}>
                            <div> Create Tour </div>
                            </Link>
                        </li> 
                        : null}

                    { orgInfo && orgInfo.token ? 
                        <li>
                            <Link to={`/myTours/${orgInfo._id}`}>
                            <div> My Tours </div>
                            </Link>
                        </li> 
                        : null}

                    { orgInfo1 && orgInfo1.token ? 
                        <li>
                            <Link to={`/myTours/${orgInfo1._id}`}>
                            <div> My Tours </div>
                            </Link>
                        </li> 
                        : null}

                    { userInfo && userInfo.token ? 
                        <li>
                            <Link to={`/hikerTours`}>
                            <div> My Tours </div>
                            </Link>
                        </li> 
                        : null}

                    { userInfo1 && userInfo1.token ? 
                        <li>
                            <Link to={`/hikerTours`}>
                            <div> My Tours </div>
                            </Link>
                        </li> 
                        : null}


                    { userInfo && userInfo.isAdmin  ? 
                        <li>
                            <Link to="/toursList">
                            <div> All Tours </div>
                            </Link>
                        </li> 
                        : null}

                    { userInfo && userInfo.isAdmin  ? 
                        <li>
                            <Link to="/hikersList">
                            <div> All Hikers </div>
                            </Link>
                        </li> 
                        : null}

                    { userInfo && userInfo.isAdmin  ? 
                        <li>
                            <Link to="/organizersList">
                            <div> All Tour Organizers </div>
                            </Link>
                        </li> 
                        : null}

                    { orgInfo && orgInfo.token ? 
                        <li>
                            <Link to={`organizer/${orgInfo._id}`}>  <div> My Profile </div>  </Link> 
                        </li>
                        :null}

                    {  orgInfo1 && orgInfo1.token ? 
                        <li>
                            <Link to={`organizer/${orgInfo1._id}`}>  <div> My Profile </div>  </Link> 
                        </li>
                        :null}

                     {  userInfo && userInfo.token ? 
                        <li>
                            <Link to={`/user/${userInfo._id}`}>  <div> Profile </div>  </Link> 
                        </li>
                        :null}

                        { userInfo && userInfo.token || userInfo1 && userInfo1.token  ? 
                        <li>
                            <Link to="/">  <div onClick={userSignOut}> Sign Out </div>  </Link> 
                        </li>
                        :null}

                        { orgInfo && orgInfo.token || orgInfo1 && orgInfo1.token ? 
                        <li>
                            <Link to="/">  <div onClick={orgSignOut}> Sign Out </div>  </Link> 
                        </li>
                        :null}
                    </ul>
                </nav>


                <FontAwesomeIcon  onClick={menuToggle} className={HeaderStyle.menuIcon} icon={faBars}/>

                </div>

            </div>
        </div>
    )
}

export default Header
