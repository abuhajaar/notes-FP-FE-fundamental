import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api2 from '../../utils/api2';

export const ActionType = {
  SET_REMINDERS: 'SET_REMINDERS',
  ADD_REMINDER: 'ADD_REMINDER',
  DELETE_REMINDER: 'DELETE_REMINDER',
};

function addReminderActionCreator(reminders) {
  return {
    type: ActionType.ADD_REMINDER,
    payload: reminders,
  };
}

export function asyncAddReminder(reminder) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      // TODO: add reminder
      const response = await api2.addReminder(reminder);
      dispatch(addReminderActionCreator(response));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function setRemindersActionCreator(reminders) {
  return {
    type: ActionType.SET_REMINDERS,
    payload: reminders,
  };
}

export function asyncFetchReminders() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api2.getReminders();
      dispatch(setRemindersActionCreator(response));
      console.log('responseFETCHREMINDER', response);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
