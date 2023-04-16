
import { Card, Input } from '../../components';
import './Home.scss';
import { showFormattedDate } from '../../utils/index';
import { getActiveNotes, deleteNote, archiveNote } from '../../utils/api';
import { Link } from 'react-router-dom';
import Reminder from '../../components/molekules/Reminder';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncAddReminder, asyncFetchReminders } from '../../states/reminder/action';


function Home({ LogOut }) {
  const [popup, setPopup] = useState(false);
  const reminders = useSelector(state => state.reminders);
  const dispatch = useDispatch(); // @TODO: mengambil dispatch dari redux
  // const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);

  // const [keyword, setKeyword] = React.useState(() => {
  //     return searchParams.get('keyword') || ''
  // });


  // const groupByDate = reminders.reduce((group, reminder) => {
  //   const { id } = reminder;
  //   group[id] = group[id] ?? [];
  //   group[id].push(reminder);
  //   return group;
  // }, {});
  // var { tanggal } = groupByDate;
  // console.log(groupByDate['010']);

  useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  async function onDeleteHandler(id) {
    await deleteNote(id);

    const { data } = await getActiveNotes();
    setNotes(data);
  }

  async function onArsipHandler(id) {
    await archiveNote(id);
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
  }

  return (
    <div className="main-page">
      <section className="main-top">
        <section className="notes">
          <div className="wrapper-search">
            <Input className="search-input" placeholder="search" />
            <button className="btn-search">button</button>
          </div>
          <div className="wrapper-content">
            <div className={!notes.length ? 'NotFound' : 'Card-container'}>
              {!notes.length ? (
                <h1>TIDAK ADA NOTE</h1>
              ) : (
                notes.map((data) => {
                  return (
                    <Card
                      key={data.id}
                      id={data.id}
                      btnTitle1={'Archived'}
                      btnTitle2={'Delete'}
                      title={data.title}
                      body={data.body}
                      createAt={showFormattedDate(data.created_at)}
                      onDelete={onDeleteHandler}
                      onArsip={onArsipHandler}
                    />
                  );
                })
              )}
            </div>
          </div>
          <div className="wrapper-add">
            <Link className="navlink" to={'/newnote'}>
              Tambah Note
            </Link>
          </div>
        </section>
        <section className="explore">
          <div className="example">
            <Reminder reminders={reminders} />
          </div>
          <div className="example">Upcoming Content</div>
        </section>
      </section>
      <section className="main-bottom">sdadsad</section>
    </div>
  );
}

export default Home;
