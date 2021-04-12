import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk'; 

import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


export const ConfigureStore = () => {

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer,  composeWithDevTools(applyMiddleware(logger, thunk)));

const persistor = persistStore(store);


return {store, persistor}

};