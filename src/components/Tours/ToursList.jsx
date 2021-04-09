import React, {useState, useEffect} from 'react';
import TourStyles from './Tours.module.css';
import TourCard from './TourCard';
import Pagination from '../Pagination/Pagination';
import {Link} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import {listTours} from '../../redux/tour/tourActions';




const ToursList = (props) => {

    const govOptions= [
        { value: 'Akkar', label: 'Akkar' },
        { value: 'Baalbek-Hermel', label: 'Baalbek-Hermel' },
        { value: 'Beirut', label: 'Beirut' },
        { value: 'Beqaa', label: 'Beqaa' },
        { value: 'Keserwan-Jbeil', label: 'Keserwan-Jbeil' },
        { value: 'Mount Lebanon', label: 'Mount Lebanon' },
        { value: 'Nabatiye', label: 'Nabatiye' },
        { value: 'North Lebanon', label: 'North Lebanon' },
        { value: 'South Lebanon', label: 'South Lebanon' },

    ]

    const hikingLevelOptions= [
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' }
    ]

     const data = useSelector(state => state.fetchTours);
     const {loading, error, tours, limit, count} = data;

     const dispatch = useDispatch();
     console.log("limit", limit);
  

     //For Pagination
     const [currentPage, setCurrentPage] = useState(1);
     const [postsPerPage, setPostsPerPage] = useState(limit);

     //For filtering 
     const [searchKeyword, setSearchKeyword] = useState();
     const [governorate, setGovernorate] = useState("");
     const [hikingLevel, setHikingLevel] = useState("");
     const [date, setDate] = useState("");
     console.log("date", date)

     const handlePageChange = (currentPage) =>{
         setCurrentPage(currentPage);
         dispatch(listTours(searchKeyword, governorate, date, currentPage, postsPerPage))
     }

     useEffect(() => {
            dispatch(listTours(searchKeyword, governorate, hikingLevel, date, currentPage, postsPerPage));

     }, [searchKeyword, governorate, hikingLevel, date,  currentPage, postsPerPage])

     const searchHandler = (e) => {
         e.preventDefault();
         setSearchKeyword(e.target.value);
         setCurrentPage(1);
         dispatch(listTours(searchKeyword, currentPage, postsPerPage));
     }

     const itemsPerPageHandler =(e) => {
         e.preventDefault();
         setPostsPerPage(e.target.value);
         setCurrentPage(1);
         dispatch(listTours(searchKeyword, governorate, date, hikingLevel, currentPage, postsPerPage));
     }

     const governorateHandler =(e) => {
        e.preventDefault();
        setGovernorate(e.target.value);
        setCurrentPage(1);
        dispatch(listTours(governorate, currentPage, postsPerPage));
    }

    
    const hikingLevelHandler =(e) => {
        e.preventDefault();
        setHikingLevel(e.target.value);
        setCurrentPage(1);
        dispatch(listTours(hikingLevel, currentPage, postsPerPage));
    }

    const dateHandler =(e) => {
        e.preventDefault();
        setDate(e.target.valueAsDate.toISOString());
        setCurrentPage(1);
        dispatch(listTours(date, currentPage, postsPerPage));
    }

    return (
        <div>
            <div className={TourStyles.filterContainer}> 

            <div>
                <i className={`fa fa-search`}/>
                <input className={TourStyles.input} type="search"  placeholder= "Search for Tours" onChange={searchHandler}/>
            </div>

            <div>
            <select className={TourStyles.selectInput} value={postsPerPage} name="itemsPerPage"  style={{textAlign:"center"}} onChange={ itemsPerPageHandler}>
            <option value="4" selected> Tours Per Page -- </option>
            <option value="4">4</option>
            <option value="8">8</option>
            </select>
            </div>

            <div>
            <select className={TourStyles.selectInput} value={hikingLevel} onChange={hikingLevelHandler}>
                <option selected disabled hidden> Select Hiking Level -- </option>
                <option value="">All</option>
                {hikingLevelOptions.map(hikingLevel => (
                    <option value={hikingLevel.value}>{hikingLevel.label}</option>
                ))}
            </select>
            </div>

            <div>
            <select className={TourStyles.selectInput} value={governorate} onChange={governorateHandler}>
                <option selected disabled hidden> Select Governorate -- </option>
                <option value="">All</option> 
                    {govOptions.map(gov=>(
                        <option value={gov.value}>{gov.label}</option>))}
            </select>
            </div>

            <div>
            <label> Select Date: </label>
            <input  className={TourStyles.input} type="date" value={date}
                onChange={dateHandler}
                />
            </div>

            </div>

        {  loading ? ( <div> Loading...</div>) : 
        error ? (<div>Error: {error} </div>) : 
        (   <div className={TourStyles.toursContainer}>
                   {data && data.tours && data.tours.length!== 0 ? tours.map((tour) => (
                    <Link to= {'/tours/' + tour._id } key={tour._id}>
                   <div key={tour._id}>
                        <TourCard tourId={tour._id} title={tour.title} profileImage={tour.profileImage}
                        district={tour.district} governorate={tour.governorate}
                        date={tour.date} departureTime={tour.departureTime}
                        returningTime={tour.returningTime} meetingPoint={tour.meetingPoint}
                        price={tour.price} tourOrganizer= {tour.tourOperator.name}></TourCard>
                    </div>
                    </Link> 
              )):  <div className={TourStyles.warningMessage}> Sorry! There are no tours that satisfy your research.</div>}
            </div> ) }

           <Pagination postsPerPage={limit} totalPosts={count} currentPage={currentPage}
           paginate= {(currentPage) =>handlePageChange(currentPage)}></Pagination>
        </div> )



        }

export default ToursList
