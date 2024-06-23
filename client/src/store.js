/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { rootReducers } from './components/redux/reducers/main';

const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk), // Add any additional middleware here
    devTools: process.env.NODE_ENV !== 'production', // Enable devtools in development
});

export default store;
