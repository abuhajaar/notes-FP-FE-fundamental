/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Card } from '../../components';
import { showFormattedDate } from '../../utils';
import './arsip.scss';
import { asyncDeleteNotesById, asyncToggleArchiveNotesById } from '../../states/notes/action';
import { Input } from '../../components/atoms';

function ArsipPage() {
  const { notes } = useSelector((state) => state);
  const [notesData, setNotesData] = useState([]);
  const dispatch = useDispatch();
  // Pagination
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const result = notes.filter((note) => note.is_archived === true);
    setNotesData(result);
  }, [dispatch, notes]);

  const onDeleteHandler = (id) => {
    dispatch(asyncDeleteNotesById(id));
  };

  const onArsipHandler = (id) => {
    dispatch(asyncToggleArchiveNotesById(id));
  };

  useEffect(() => {
    const endOffset = itemOffset + 3;
    setCurrentItems(notesData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(notesData.length / 3));
  }, [itemOffset, notesData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 3) % notesData.length;
    setItemOffset(newOffset);
  };

  if (!notesData) {
    return (
      <h1>
        Loading...
      </h1>
    );
  }
  return (
    <div className="main-page">

      <h1 className="main-page__heading">Archived Notes</h1>

      <div className="main-page__top">
        <div className="main-page__top__notes__search">
          <Input className="main-page__top__notes__search__input" placeholder={localStorage.getItem('local') === 'id' ? 'cari' : 'search'} />
          <button type="button" className="main-page__top__notes__search__btn">
            {' '}
            <FaSearch />
            {' '}
          </button>
        </div>

      </div>

      <div className={!notesData.length ? 'main-page__notfound' : 'main-page__Card-container'}>

        <div className="main-page__content">
          <div className="main-page__content__stats">
            <div className="main-page__content__stats__label">
              {localStorage.getItem('local') === 'id' ? 'Jumlah Arsip' : 'Total Archive'}
            </div>
            <div className="main-page__content__stats__value">{notesData.length}</div>
          </div>
          <div className="main-page__content__stats">
            <div className="main-page__content__stats__label">
              {localStorage.getItem('local') === 'id' ? 'Jumlah Catatan' : 'Total Notes'}
            </div>
            <div className="main-page__content__stats__value">{notes.length}</div>
          </div>
          <div className="main-page__content__stats">
            <div className="main-page__content__stats__label">
              {localStorage.getItem('local') === 'id' ? 'Jumlah Arsip' : 'Total Archive'}
            </div>
            <div className="main-page__content__stats__value">{notesData.length}</div>
          </div>
          <div className="main-page__content__stats">
            <div className="main-page__content__stats__label">
              {localStorage.getItem('local') === 'id' ? 'Jumlah Arsip' : 'Total Archive'}
            </div>
            <div className="main-page__content__stats__value">{notesData.length}</div>
          </div>

        </div>

        {!notesData.length ? (
          <div className="main-page__notfound__wrapper">

            <h1>{localStorage.getItem('local') === 'id' ? 'Mulai Catat Sekarang' : 'Begin Your Journey'}</h1>
          </div>
        ) : (
          <div className="main-page__Card-container__wrapper">

            {currentItems.map((note) => (
              <Card
                key={note.id}
                id={note.id}
                btnTitle1="Activate"
                btnTitle2="Delete"
                title={note.title}
                body={note.body}
                createAt={showFormattedDate(note.created_at)}
                onDelete={onDeleteHandler}
                onArsip={onArsipHandler}
                className="card-notes-archive"
              />

            ))}

          </div>
        )}
        <div className="main-page__Card-container__pagination">

          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />

        </div>
      </div>

      <div className="main-page__bottom">
        <div className="main-page__bottom__settings">SETTING</div>

        <Link className="main-page__bottom__show" to="/newnote">
          <div className="main-page__bottom__show__navlink">
            {localStorage.getItem('local') === 'id' ? 'Tambahkan Catatan' : 'Add Notes'}
          </div>
        </Link>

      </div>
    </div>
  );
}

export default ArsipPage;
