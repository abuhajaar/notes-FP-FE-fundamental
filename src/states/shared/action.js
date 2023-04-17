import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getData } from "../../utils/fetch";
import { setRemindersActionCreator } from "../reminder/action";
import { setNotesActionCreator } from "../notes/action";


function asyncFetchReminderAndNotes() {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            const { data: { data: reminders } } = await getData('/reminders');
            console.log('remindersFECH AWAL', reminders)
            dispatch(setRemindersActionCreator(reminders));
            const { data: { data: notes } } = await getData('/notes');
            dispatch(setNotesActionCreator(notes));
        }
        catch (error) {
            alert(error);
        }
        dispatch(hideLoading());
    };
}

export { asyncFetchReminderAndNotes }