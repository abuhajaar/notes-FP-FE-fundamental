import React from 'react'

import { Card, Gap, Input } from '../../components'
import './Home.scss'
import { showFormattedDate } from '../../utils/index'
import {
    getActiveNotes,
    deleteNote,
    archiveNote,
} from '../../utils/api'
import { NavLink} from 'react-router-dom'


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
            setNotes(data)
        })
    }
    // const filteredContacts = contacts.filter((contact) => {
    //     return contact.name.toLowerCase().includes(
    //         keyword.toLowerCase()
    //     );
    // });


    return (
        <div className='main-page'>
            <div className='wrapper'>
                <Input className='input1' placeholder='search' />
                <NavLink className='NavLink' to={'/newnote'}>Tambah Note</NavLink>
            </div>
            <div className={!notes.length ? 'NotFound' : 'Card-container'}>
                {!notes.length ? <h1>TIDAK ADA NOTE</h1> : notes.map((data) => {
                    return (
                        <Card key={data.id} id={data.id} btnTitle1={'Archived'} btnTitle2={'Delete'} title={data.title} body={data.body} createAt={showFormattedDate(data.createdAt)} onDelete={onDeleteHandler} onArsip={onArsipHandler} />
                    )
                })}
            </div>
            <Gap height={20} />
        </div>
    )
}

export default Home