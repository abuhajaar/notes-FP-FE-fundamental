import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import ReminderDetailCard from '../../components/atoms/Reminder-Detail-Card';
import './DetailReminder.scss';
import { getData } from '../../utils/fetch';
import PopupForm from '../../components/molekules/PopupForm';
import { asyncAddReminder, asyncFetchReminders } from '../../states/reminder/action';


function DetailReminder() {
  const [popup, setPopup] = useState(false);
  const { id } = useParams();
  const reminders = useSelector(state => state.reminders);
  const dispatch = useDispatch(); // @TODO: mengambil dispatch dari redux

  useEffect(() => {
    dispatch(asyncFetchReminders());
  }, [dispatch]);

  function submitForm(data) {
    dispatch(asyncAddReminder(data));
  }


  if (!reminders) {
    return <h1>Loading Reminder</h1>;
  }

  function submitForm(data) {
    console.log('data', data);
  }

  return (
    <div className="reminder-detail-page">
      <div className="reminder-detail-page__wrapper">
        <div className={!reminders.length ? 'reminder-detail-page__wrapper__notfound' : 'reminder-detail-page__wrapper__card-container'}>
          {!reminders.length ? (null) : (
            reminders.map((data) => {
              return (
                <ReminderDetailCard key={data.id} data={data} />
              );
            })
          )}
          <button className='btn-popup' onClick={() => setPopup(true)}>Add New Task</button>
          <PopupForm handleSubmit={submitForm()} trigger={popup} setTrigger={setPopup} />
        </div>
      </div>
    </div>

  );
}

export default DetailReminder;
