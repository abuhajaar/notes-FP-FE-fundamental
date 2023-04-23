/* eslint-disable default-param-last */
import { ActionType } from './action';

const status = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
};

const initialState = {
  reminders: [],
  status: status.idle,
};
function reminderReducer(reminders = initialState, action) {
  switch (action.type) {
    case ActionType.SET_REMINDERS:
      return {
        ...reminders,
        reminders: action.payload,
        status: status.success,
      };
    case ActionType.ADD_REMINDER:
      return {
        ...reminders,
        reminders: [...reminders.reminders, action.payload],
        status: status.success,
      };
    case ActionType.DELETE_REMINDER:
      return {
        ...reminders,
        reminders: reminders.reminders.filter((reminder) => reminder.id !== action.payload),
        status: status.success,
      };
    case ActionType.COMPLETE_REMINDER:
      console.log('masuk complete', reminders);
      return {
        ...reminders,
        reminders: reminders.reminders.map((reminder) => {
          if (reminder.id === action.payload) {
            return {
              ...reminder,
              completed: !reminder.completed,
            };
          }
          return reminder;
        }),
        status: status.success,
      };
    default:
      return reminders;
  }
}

export default reminderReducer;
