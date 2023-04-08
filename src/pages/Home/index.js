import React from 'react';

import { Card, Input } from '../../components';
import './Home.scss';
import { showFormattedDate } from '../../utils/index';
import { getActiveNotes, deleteNote, archiveNote } from '../../utils/api';
import { Link } from 'react-router-dom';

function Home({ LogOut }) {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  // const [keyword, setKeyword] = React.useState(() => {
  //     return searchParams.get('keyword') || ''
  // });

  // const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  async function onDeleteHandler(id) {
    await deleteNote(id);
    // update the contacts state from network.js
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
  // const filteredContacts = contacts.filter((contact) => {
  //     return contact.name.toLowerCase().includes(
  //         keyword.toLowerCase()
  //     );
  // });

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
            <div className="coba-text"></div>Lorem Ipsum is simply dummy text of
            the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
          </div>
          <div className="example">Upcoming Content</div>
        </section>
      </section>
      <section className="main-bottom">sdadsad</section>
    </div>
  );
}

export default Home;
