import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncAddReminder, asyncFetchReminders } from '../../states/reminder/action';
import PopupForm from '../../components/molekules/PopupForm';

function Reminder() {
    const [popup, setPopup] = useState(false);
    const reminders = useSelector(state => state.reminders);
    const dispatch = useDispatch(); // @TODO: mengambil dispatch dari redux

    useEffect(() => {
        dispatch(asyncFetchReminders());
    }, [dispatch]);

    function submitForm(data) {
        dispatch(asyncAddReminder(data));
    }

    return (
        <div>
            {console.log(reminders)}
            <h1>Reminder</h1>
            <button className='btn-popup' onClick={() => setPopup(true)}>Add New Task</button>
            <PopupForm handleSubmit={submitForm} trigger={popup} setTrigger={setPopup} />
        </div>
    )
}

export default Reminder;
