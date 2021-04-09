import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import Cookie from "js-cookie";
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk'; 

const userInfo = Cookie.getJSON("userInfo") || null;
const orgInfo = Cookie.getJSON("orgInfo") || null;
const initialState = { orgSignin: { orgInfo }, userSignin: { userInfo } };


const store = createStore(rootReducer, initialState, 
    composeWithDevTools(applyMiddleware(logger, thunk)));

export default store;