function reminderReducer(reminders = [], action) {
    switch (action.type) {
        case 'SET_REMINDERS':
            return action.payload
        case 'ADD_REMINDER':
            return [...reminders, action.payload]
        case 'DELETE_REMINDER':
            return reminders.filter(reminder => reminder.id !== action.payload)
        default:
            return reminders
    }
}

export default reminderReducer;