import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk'; 

import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
const orgInfo = JSON.parse(localStorage.getItem('orgInfo')) || null;
const initialState = { orgSignin: { orgInfo }, userSignin: { userInfo } };


export const ConfigureStore = () => {

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['signinUser', 'regUser', 'signinOrg', 'regOrganizer' ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(logger, thunk)));

const persistor = persistStore(store);


return {store, persistor}

};