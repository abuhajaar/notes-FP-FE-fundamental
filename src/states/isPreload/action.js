/**
 * @TODO: Define all the actions (creator) for the isPreLoad state
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAuthUserActionCreator } from '../authUser/action';
import api2 from '../../utils/api2';

const ActionType = {
    SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
    return {
        type: ActionType.SET_IS_PRELOAD,
        payload: {
            isPreload,
        },
    };
}

function asyncPreloadProcess() {

    return async (dispatch) => {
        dispatch(showLoading());
        try {
            // preload process
            const authUser = await api2.ourAuth();
            dispatch(setAuthUserActionCreator(authUser));
        } catch (error) {
            // fallback process
            dispatch(setAuthUserActionCreator(null));
        } finally {
            // end preload process
            dispatch(setIsPreloadActionCreator(false));
        }
        dispatch(hideLoading());
    };
}

export {
    ActionType,
    setIsPreloadActionCreator,
    asyncPreloadProcess,
};