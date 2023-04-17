import { ActionType } from "./action"


function notesReducer(notes = [], action) {
    switch (action.type) {
        case ActionType.SET_NOTES:
            return action.payload
        case ActionType.ADD_NOTE:
            return [...notes, action.payload]
        case ActionType.DELETE_NOTE:
            return notes.filter(note => note.id !== action.payload)
        default:
            return notes
    }
}

export default notesReducer;