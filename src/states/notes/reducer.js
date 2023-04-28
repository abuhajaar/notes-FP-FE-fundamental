/* eslint-disable default-param-last */
import { ActionType } from './action';

function notesReducer(notes = [], action) {
  switch (action.type) {
    case ActionType.SET_NOTES:
      return action.payload;
    case ActionType.ADD_NOTE:
      return [...notes, action.payload];
    case ActionType.DELETE_NOTE:
      return notes.filter((note) => note.id !== action.payload);
    case ActionType.TOGGLE_ARCHIVE_NOTE:
      return notes.map((note) => {
        if (note.id === action.payload) {
          return {
            ...note,
            is_archived: !note.is_archived,
          };
        }
        return note;
      });
    default:
      return notes;
  }
}

notesReducer.defaultProps = {
  notes: [],
};

export default notesReducer;
