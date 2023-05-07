/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Input } from '../../components';
import './Home.scss';
import { showFormattedDate } from '../../utils/index';
import Reminder from '../../components/molekules/Reminder';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncDeleteNotesById, asyncToggleArchiveNotesById,
} from '../../states/notes/action';
import { asyncFetchReminderAndNotes } from '../../states/shared/action';
// import Loading from '../../components/atoms/Loading';
import { FaSearch } from 'react-icons/fa';
import Profile from '../../components/atoms/Profile';
import FileInput from '../../components/atoms/FileInput';
import News from '../../components/atoms/News';

function Home() {
  const { notes } = useSelector((state) => state);
  const { reminders } = useSelector((state) => state.reminders);
  const [notesData, setNotesData] = useState([]);
  const dispatch = useDispatch(); // @TODO: mengambil dispatch dari redux
  const [urlImage, setUrlImage] = useState('');

  useEffect(() => {
    setUrlImage(localStorage.getItem('ImageTest'));
    dispatch(asyncFetchReminderAndNotes());
  }, [dispatch]);

  useEffect(() => {
    const result = notes.filter((note) => note.is_archived === false);
    setNotesData(result);
  }, [dispatch, notes]);

  async function onDeleteHandler(id) {
    dispatch(asyncDeleteNotesById(id));
  }

  async function onArsipHandler(id) {
    dispatch(asyncToggleArchiveNotesById(id));
  }

  return (
    <div className="home-page">
      <div className="home-page__top">
        <div className="home-page__top__notes">
          <div className="home-page__top__notes__search">
            <Input className="home-page__top__notes__search__input" placeholder={localStorage.getItem('local') === 'id' ? 'cari' : 'search'} />
            <button type="button" className="home-page__top__notes__search__btn">
              {' '}
              <FaSearch />
              {' '}
            </button>
          </div>
          <div className="home-page__top__notes__content">
            <div className={!notesData.length ? 'home-page__top__notes__content__notfound' : 'home-page__top__notes__content__card'}>
              {!notesData.length ? (
                <div className="home-page__top__notes__content__notfound__wrapper">
                  <h1>
                    {localStorage.getItem('local') === 'id' ? 'Tuangkan Pikiranmu' : 'Collect Your Mind'}
                  </h1>
                </div>
              ) : (
                notesData.map((data) => (
                  <Card
                    key={data.id}
                    id={data.id}
                    btnTitle1="Archived"
                    btnTitle2={localStorage.getItem('local') === 'id' ? 'Hapus' : 'Delete'}
                    title={data.title}
                    body={data.body}
                    createAt={showFormattedDate(data.created_at, localStorage.getItem('local') || 'en')}
                    // eslint-disable-next-line react/jsx-no-bind
                    onDelete={onDeleteHandler}
                    // eslint-disable-next-line react/jsx-no-bind
                    onArsip={onArsipHandler}
                    className="card-notes"
                  />
                ))
              )}
            </div>
          </div>
          <Link className="home-page__top__notes__show" to="/newnote">
            <div className="home-page__top__notes__show__navlink">
              {localStorage.getItem('local') === 'id' ? 'Tambahkan Catatan' : 'Add Notes'}
            </div>
          </Link>
        </div>
        <div className="home-page__top__explore">
          <div className="home-page__top__explore__reminder">
            <Profile />
            <Reminder reminders={reminders} />
            <News />
          </div>
          <div className="home-page__top__explore__thread" />
        </div>
      </div>
      <div className="main-bottom">sdadsad</div>
    </div>
  );
}

export default Home;
