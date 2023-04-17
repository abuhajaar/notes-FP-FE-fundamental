import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncAddReminder } from '../../states/reminder/action';
import PopupForm from '../../components/molekules/PopupForm';
import Loading from '../../components/atoms/Loading';

function Reminder() {
    const [popup, setPopup] = useState(false);
    const reminders = useSelector(state => state.reminders);
    const dispatch = useDispatch(); // @TODO: mengambil dispatch dari redux

    function submitForm(data) {
        dispatch(asyncAddReminder(data));
    }

    return (
        <div className='reminder_wrapper'>
            <Loading />
            <h1>Reminder</h1>
            <PopupForm handleSubmit={submitForm} trigger={popup} setTrigger={setPopup} />
        </div>
    )
}

export default Reminder;
