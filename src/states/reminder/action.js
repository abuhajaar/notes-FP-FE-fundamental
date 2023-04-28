import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api2 from '../../utils/api2';

export const ActionType = {
  SET_REMINDERS: 'SET_REMINDERS',
  ADD_REMINDER: 'ADD_REMINDER',
  DELETE_REMINDER: 'DELETE_REMINDER',
  COMPLETE_REMINDER: 'COMPLETE_REMINDER',
  FAVORITE_REMINDER: 'FAVORITE_REMINDER',
  EDIT_REMINDER: 'EDIT_REMINDER',
};

function addReminderActionCreator(reminders) {
  return {
    type: ActionType.ADD_REMINDER,
    payload: reminders,
  };
}

export function asyncAddReminder(reminder) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    // dispatch(addReminderActionCreator(reminder));
    try {
      // TODO: add reminder
      const { id } = await api2.addReminder(reminder);
      const reminderNew = {
        ...reminder,
        id,
        favorite: false,
        completed: false,
      };
      dispatch(addReminderActionCreator(reminderNew));
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
      console.log('responseFETCHREMINDER', response);
      dispatch(setRemindersActionCreator(response));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function deleteReminderActionCreator(id) {
  return {
    type: ActionType.DELETE_REMINDER,
    payload: id,
  };
}

export function asyncDeleteReminder(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(deleteReminderActionCreator(id));
    try {
      await api2.deleteReminderById(id);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncCompleteReminder(id) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    let type;
    const data = getState().reminders.reminders;
    const result = data.filter((reminder) => reminder.id === id);
    if (result[0].completed === true) {
      type = 'uncompleted';
    } else {
      type = 'completed';
    }
    dispatch(completeReminderActionCreator(id));
    try {
      await api2.completeReminderById(id, type);
    } catch (error) {
      dispatch(completeReminderActionCreator(id));
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function completeReminderActionCreator(id) {
  return {
    type: ActionType.COMPLETE_REMINDER,
    payload: id,
  };
}

export function asyncFavoriteReminder(id) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    let type;
    const data = getState().reminders.reminders;
    const result = data.filter((reminder) => reminder.id === id);
    if (result[0].favorite === true) {
      type = 'unfavorited';
    } else {
      type = 'favorited';
    }
    dispatch(favoriteReminderActionCreator(id));
    try {
      await api2.favoriteReminderById(id, type);
    } catch (error) {
      dispatch(favoriteReminderActionCreator(id));
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function favoriteReminderActionCreator(id) {
  return {
    type: ActionType.FAVORITE_REMINDER,
    payload: id,
  };
}

export function asyncEditReminder(id, reminder) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(editReminderActionCreator(id, reminder));
    try {
      await api2.editReminderById(id, reminder);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function editReminderActionCreator(id, reminder) {
  return {
    type: ActionType.EDIT_REMINDER,
    payload: {
      id,
      reminder,
    },
  };
}
