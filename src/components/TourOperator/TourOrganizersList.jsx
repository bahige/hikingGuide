import React, {useState, useEffect} from 'react';
import TourStyles from '../Tours/Tours.module.css';
import Pagination from '../Pagination/Pagination';
import {Link} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import TourOrganizerCard from './TourOrganizerCard';
import { listTourOrganizers } from '../../redux/organizer/organizerActions';




const TourOrganizersList = () => {

     const tourOrganizerData = useSelector(state => state.orgList);
     const {loading, error, tourOrganizers, limit, count} = tourOrganizerData;
     const dispatch = useDispatch();


     //For Pagination
     const [currentPage, setCurrentPage] = useState(1);
     const [postsPerPage, setPostsPerPage] = useState(limit);

     const [searchKeyword, setSearchKeyword] = useState("");

     const handlePageChange = (currentPage) =>{
         setCurrentPage(currentPage);
         dispatch(listTourOrganizers(searchKeyword, currentPage, postsPerPage))
     }

     useEffect(() => {
         dispatch(listTourOrganizers(searchKeyword, currentPage, postsPerPage));

     }, [searchKeyword, currentPage, postsPerPage])

     const searchHandler = (e) => {
         e.preventDefault();
         setSearchKeyword(e.target.value);
         setCurrentPage(1);
         dispatch(listTourOrganizers(searchKeyword, currentPage, postsPerPage));         
     }

     const itemsPerPageHandler =(e) => {
        e.preventDefault();
        setPostsPerPage(e.target.value);
        setCurrentPage(1);
        dispatch(listTourOrganizers(searchKeyword, currentPage, postsPerPage));
    }

    return (
        <div>

        <div className={TourStyles.filterContainer}> 

        <div>
            <i className={`fa fa-search`}/>
            <input className={TourStyles.input} type="search"  placeholder= "Search for Tour Organizers" onChange={searchHandler}/>
        </div>

        <div>
            <select className={TourStyles.selectInput} value={postsPerPage} name="itemsPerPage"  style={{textAlign:"center"}} onChange={ itemsPerPageHandler}>
            <option value="4" selected> Tour Organizers Per Page -- </option>
            <option value="4">4</option>
            <option value="8">8</option>
            </select>
            </div>
        </div>

        {  loading ? ( <div> Loading...</div>) : 
        error ? (<div>Error: {error} </div>) :
           ( <div className={TourStyles.toursContainer}>
                   {tourOrganizerData && tourOrganizerData.tourOrganizers && tourOrganizers.length !==0
                   ? tourOrganizers.map((tourOrg) => (
                    <Link to= {'/organizers/' + tourOrg._id }>
                    <div key={tourOrg._id}>
                        <TourOrganizerCard tourId={tourOrg._id} title={tourOrg.name} 
                        profileImage={tourOrg.image}></TourOrganizerCard>
                    </div>
                    </Link>
              )): <div className={TourStyles.warningMessage}> Sorry! There are no tours that satisfy your research.</div> }
            </div> )}


           <Pagination postsPerPage={limit} totalPosts={count} currentPage={currentPage}
           paginate= {(currentPage) =>handlePageChange(currentPage)}></Pagination>
        </div> )

        }

export default TourOrganizersList
