import React from 'react';
import './App.css';
import SignInFormsContainer from './components/SignInForms/SignInFormsContainer';
import Header from './components/Header/Header';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HikerRegisterContainer from './components/HikerRegisterForm/HikerRegisterContainer';
import OrganizerRegisterContainer from './components/OrganizerRegisterForm/OrganizerRegisterContainer';
import Footer from './components/Footer/Footer';
import ChangeHikerPassword from './components/ChangePassword/ChangeHikerPassword';
import ChangeOrganizerPassword from './components/ChangePassword/ChangeOrganizerPassword';
import ToursList from './components/Tours/ToursList';
import ToursDetails from './components/Tours/TourDetails';

import { Provider } from "react-redux";
import store from './redux/store';
import TourDetails from './components/Tours/TourDetails';
import TourForm from './components/TourForm/TourForm';
import AdminToursList from './components/AdminLists/AdminToursList';
import AdminUsersList from './components/AdminLists/AdminUsersList';
import AdminTourOrganizersList from './components/AdminLists/AdminTourOrganizersList';
import TourOrganizersList from './components/TourOperator/TourOrganizersList';
import SingleTourOperator from './components/AdminLists/SingleTourOperator';
import ToursListPerOrganizer from './components/AdminLists/ToursListPerOrganizer';
import SingleTourOperatorAuth from './components/AdminLists/SingleTourOperatorAuth';
import OrganizerEditForm from './components/AdminLists/OrganizerEditForm';
import UserProfile from './components/AdminLists/UserProfile';
import UserEditForm from './components/AdminLists/UserEditForm';
import ToursListByOrganizer from './components/TourOperator/ToursListByOrganizer';
import ToursListPerUser from './components/AdminLists/ToursListPerUser';



function App() {
  return (

<BrowserRouter>
  <Provider store={store}>
    <div className="App">
       <Header></Header>
        <Switch>
          <Route exact path="/" component={SignInFormsContainer}></Route>
          <Route exact path="/register_hiker" component={HikerRegisterContainer}></Route>
          <Route exact path="/register_organizer" component={OrganizerRegisterContainer}></Route>
          <Route exact path="/changePassword_hiker" component={ChangeHikerPassword}></Route>
          <Route exact path="/changePassword_organizer" component={ChangeOrganizerPassword}></Route>
          <Route exact path="/tours" component={ToursList}></Route>
          <Route exact path="/tours/:id" component={TourDetails}></Route>
          <Route exact path="/organizers" component={TourOrganizersList}></Route>
          <Route exact path="/organizers/:orgId" component={ToursListByOrganizer}></Route>
          <Route exact path="/toursList" component={AdminToursList}></Route>
          <Route exact path="/createTour" component={TourForm}></Route>
          <Route exact path="/toursList/:id" component={TourForm}></Route>
          <Route exact path="/hikersList" component={AdminUsersList}></Route>
          <Route exact path="/organizersList" component={AdminTourOrganizersList}></Route>
          <Route exact path="/organizersList/:orgId" component={SingleTourOperator}></Route>
          <Route exact path="/myTours/:orgId" component={ToursListPerOrganizer}></Route>
          <Route exact path="/myTours/toursList/:id" component={TourForm}></Route>
          <Route exact path="/hikerTours" component={ToursListPerUser}></Route>
          <Route exact path="/organizer/:authOrgId" component={SingleTourOperatorAuth}></Route>
          <Route exact path="/organizer/:authOrgId/EditOrganizer" component={OrganizerEditForm}></Route>
          <Route exact path="/user/:userId" component={UserProfile}></Route>
          <Route exact path="/user/:userId/userEditForm" component={UserEditForm}></Route>



        </Switch>
       <Footer></Footer>
    </div>
  </Provider>    
</BrowserRouter>

  );
}

export default App;
