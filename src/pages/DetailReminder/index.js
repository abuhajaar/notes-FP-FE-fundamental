import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ReminderDetailCard from '../../components/atoms/Reminder-Detail-Card';
import reminders from '../../utils/Reminders';
import './DetailReminder.scss';
import { getData } from '../../utils/fetch';
import PopupForm from '../../components/molekules/PopupForm';


function DetailReminder() {
  const { id } = useParams();
  const [reminder, setReminder] = useState([]);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const {data:{data}} = await getData(`/reminders`);
      const {reminders} = data; 
      setReminder(reminders);
    };
    fetchData();
    const remindertest = reminders.filter((data) => data.tanggal === id);
    setReminder(remindertest);
  }, [id]);
  

  if (!reminder) {
    return <h1>Loading Reminder</h1>;
  }


  return (
    <div className="reminder-detail-page">
      {console.log(reminder)}
      
      <div className="reminder-detail-page__wrapper">
        <div className={!reminder.length ? 'reminder-detail-page__wrapper__notfound' : 'reminder-detail-page__wrapper__card-container'}>
          {!reminder.length ? ('') : (
            reminder.map((data) => {
             
              return (
                <ReminderDetailCard data={data}/>
                
              );
            })
            )}
          <button className='btn-popup' onClick={() => setPopup(true)}>Add New Task</button>
          <PopupForm trigger={popup} setTrigger={setPopup}/>
        </div>
      </div>
    </div>
    
  );
}

export default DetailReminder;
