import { React, useState, useEffect } from 'react';

import { Card, Input } from '../../components';
import './Home.scss';
import { showFormattedDate } from '../../utils/index';
import { getActiveNotes, deleteNote, archiveNote } from '../../utils/api';
import { Link } from 'react-router-dom';
import Reminder from '../../components/molekules/Reminder';

function Home({ LogOut }) {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  // const [keyword, setKeyword] = React.useState(() => {
  //     return searchParams.get('keyword') || ''
  // });
  const reminders = [
    {
      id: '001',
      content: 'belanja A',
      tanggal: '2023-04-10',
    },
    {
      id: '002',
      content: 'belanja B',
      tanggal: '2023-04-10',
    },
    {
      id: '003',
      content: 'belanja C',
      tanggal: '2023-04-11',
    },
    {
      id: '004',
      content: 'belanja C',
      tanggal: '2023-04-14',
    },
    {
      id: '010',
      content: 'belanja Ciki',
      tanggal: '2023-04-14',
    },
    {
      id: '005',
      content: 'belanja gg',
      tanggal: '2023-04-11',
    },
    {
      id: '006',
      content: 'belanja jjkij',
      tanggal: '2023-04-11',
    },
    {
      id: '007',
      content: 'belanja C',
      tanggal: '2023-04-13',
    },
  ];

  const groupByDate = reminders.reduce((group, reminder) => {
    const { id } = reminder;
    group[id] = group[id] ?? [];
    group[id].push(reminder);
    return group;
  }, {});
  var { tanggal } = groupByDate;
  console.log(groupByDate['010']);

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

  // function onKeywordChangeHandler(keyword) {
  //     setKeyword(keyword);
  //     setSearchParams({ keyword });
  // }
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
