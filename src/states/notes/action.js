import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api2 from '../../utils/api2';

export const ActionType = {
  SET_NOTES: 'SET_NOTES',
  ADD_NOTE: 'ADD_NOTE',
  DELETE_NOTE: 'DELETE_NOTE',
  TOGGLE_ARCHIVE_NOTE: 'TOGGLE_ARCHIVE_NOTE',
  UNARCHIVE_NOTE: 'UNARCHIVE_NOTE',
};

export function setNotesActionCreator(notes) {
  return {
    type: ActionType.SET_NOTES,
    payload: notes,
  };
}

export function asyncFetchNotes() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api2.getNotes();
      dispatch(setNotesActionCreator(response));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function addNoteActionCreator(note) {
  return {
    type: ActionType.ADD_NOTE,
    payload: note,
  };
}

export function asyncAddNote(note) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api2.addNotes(note);
      // console.log('responseAddNote', response);
      dispatch(addNoteActionCreator(response));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function deleteNoteActionCreator(id) {
  return {
    type: ActionType.DELETE_NOTE,
    payload: id,
  };
}

export function asyncDeleteNotesById(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(deleteNoteActionCreator(id));
    try {
      await api2.deleteNotesById(id);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function toggleArchiveNoteActionCreator(id, type) {
  return {
    type: ActionType.TOGGLE_ARCHIVE_NOTE,
    payload: id,
  };
}

export function asyncToggleArchiveNotesById(id) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const note = await getState().notes.find((Note) => Note.id === id);
    let type = '';

    if (note.is_archived) {
      type = 'unarchive';
    } else {
      type = 'archive';
    }
    dispatch(toggleArchiveNoteActionCreator(id));

    try {
      await api2.toggleArchiveNotesById(id, type);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function getActiveNotes() {
  return (getState) => {
    const { notes } = getState();
    console.log('notes', notes);
    return notes.filter((note) => !note.is_archived);
  };
}

export function getArchivedNotes() {
  return (getState) => {
    const { notes } = getState();
    return notes.filter((note) => note.is_archived);
  };
}
