import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk'; 

import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// convert object to string and store in localStorage
// function saveToLocalStorage(state) {
//     try {
//       const serialisedState = JSON.stringify(state);
//       localStorage.setItem("persistantState", serialisedState);
//     } catch (e) {
//       console.warn(e);
//     }
//   }
  
  // load string from localStarage and convert into an Object
  // invalid output must be undefined
  // function loadFromLocalStorage() {
  //   try {
  //     const serialisedState = localStorage.getItem("persistantState");
  //     if (serialisedState === null) return undefined;
  //     return JSON.parse(serialisedState);
  //   } catch (e) {
  //     console.warn(e);
  //     return undefined;
  //   }
  // }


// const store = createStore(pers, loadFromLocalStorage(),  composeWithDevTools(applyMiddleware(logger, thunk)));

const store = createStore(persistedReducer,  composeWithDevTools(applyMiddleware(logger, thunk)));

const persistor = persistStore(store);

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
// store.subscribe(() => saveToLocalStorage(store.getState()));


export default () =>  {return {store, persistor}};