
import { ActionType } from "./action"
function reminderReducer(reminders = [], action) {
    switch (action.type) {
        case ActionType.SET_REMINDERS:
            return action.payload
        case ActionType.ADD_REMINDER:
            return [...reminders, action.payload]
        case ActionType.DELETE_REMINDER:
            return reminders.filter(reminder => reminder.id !== action.payload)
        default:
            return reminders
    }
}

export default reminderReducer;