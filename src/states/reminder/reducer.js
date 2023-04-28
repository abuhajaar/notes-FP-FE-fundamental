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
    case ActionType.FAVORITE_REMINDER:
      return {
        ...reminders,
        reminders: reminders.reminders.map((reminder) => {
          if (reminder.id === action.payload) {
            return {
              ...reminder,
              favorite: !reminder.favorite,
            };
          }
          return reminder;
        }),
        status: status.success,
      };
    case ActionType.EDIT_REMINDER:
      return {
        ...reminders,
        reminders: reminders.reminders.map((reminder) => {
          if (reminder.id === action.payload.id) {
            return {
              ...reminder,
              title: action.payload.reminder.title,
              content: action.payload.reminder.content,
              date: action.payload.reminder.date,
              category: action.payload.reminder.category,
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
