import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import reminderReducer from './reminder/reducer';
const store = configureStore({
    reducer: {
        isPreload: isPreloadReducer,
        authUser: authUserReducer,
        loadingBar: loadingBarReducer,
        reminders: reminderReducer,
        // Add the reducer to your store on the `router` key
        // Also apply our middleware for navigating
    },
});

export default store;