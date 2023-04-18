/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncAddReminder } from '../../states/reminder/action';
import PopupForm from '../../components/molekules/PopupForm';
import Loading from '../../components/atoms/Loading';

function Reminder() {
  const [popup, setPopup] = useState(false);
  // TODO - get reminders from redux
  // const reminders = useSelector((state) => state.reminders);
  const dispatch = useDispatch(); // @TODO: mengambil dispatch dari redux

  const submitForm = (data) => {
    console.log(data);
    dispatch(asyncAddReminder(data));
  };

  return (
    <div className="reminder_wrapper">
      <Loading />
      <h1>Reminder</h1>
      <PopupForm handleSubmit={submitForm} trigger={popup} setTrigger={setPopup} />
    </div>
  );
}

export default Reminder;
