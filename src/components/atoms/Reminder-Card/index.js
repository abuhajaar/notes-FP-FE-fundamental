import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './reminder-card.scss';
import axios from 'axios';

function ReminderCard({ reminderDate, reminderTotalTask }) {
  // Fotmat Date Begin

  function formatDay(date) {
    const newDate = new Date(date);
    const weekday = localStorage.getItem('local') === 'id' ? ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'] : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = weekday[newDate.getDay()];
    return day;
  }

  function formatDate(date) {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const dt = newDate.getDate();

    return `${dt}-${month}-${year}`;
  }

  // Fotmat Date End

  // Weather Begin

  const API_endpoint = 'https://api.openweathermap.org/data/2.5/weather?';

  const API_key = process.env.REACT_APP_API_KEY;
  const [responseData, setResponseData] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      test(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  async function test(lat, long) {
    const finalAPI = `${API_endpoint}lat=${lat}&lon=${long}&appid=${API_key}&units=metric`;
    const response = await axios.get(finalAPI);
    setResponseData(response.data);
  }
  // Weather End

  // Mouse Effect Begin

  const handleOnMouseMove = (e) => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  for (const card of document.querySelectorAll('.card-reminder')) {
    card.onmousemove = (e) => handleOnMouseMove(e);
  }

  // Mouse Effect End

  return (
    <Link className="reminder-card" to="/reminder/today">
      <div className="card-reminder">
        <div className="card-reminder__container">
          <div className="card-reminder__container__day">
            <h1>{formatDay(reminderDate)}</h1>
          </div>
          <div className="card-reminder__container__date">
            <h3>
              {formatDate(reminderDate)}
            </h3>
          </div>
          <div className="card-reminder__container__weather">
            <h4>Weather today</h4>
            <h5>{responseData.weather ? responseData.weather[0].main : null}</h5>
            <div className="card-reminder__container__weather__icon">

              <img src={`http://openweathermap.org/img/wn/${responseData.weather ? responseData.weather[0].icon : null}.png`} alt="weather-icon" />

            </div>

            <div className="card-reminder__container__weather__temp">
              <p>
                {responseData.main ? responseData.main.temp : null}
                {' '}
                C
              </p>
            </div>

            <div className="card-reminder__container__weather__city">
              <p>
                {responseData.name ? responseData.name : null}
              </p>
            </div>
          </div>
          <div className="card-reminder__container__todo">
            {reminderTotalTask}
            {' '}
            {localStorage.getItem('local') === 'id' ? 'Tugas untuk hari ini' : 'Task for today'}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ReminderCard;
