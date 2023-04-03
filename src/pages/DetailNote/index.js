
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Gap } from '../../components';
import { showFormattedDate } from '../../utils/index';
import { getNote } from '../../utils/api';
import './DetailNote.scss';


function DetailNote()  {
    const { id } = useParams();
    const [notes, setNotes] = React.useState([]);

    useEffect(() => {
        getNote(id).then(({ data }) => {
            setNotes(data);
        });
    }, [id]);

    if (!notes) {
        return <h1>Loading...</h1>
    }

    return (
        < div className='detail_page' >
            {console.log(notes)}
            <div className='wrapper-detailNote'>
                <Gap height={30} />
                <h1>{notes.title}</h1>
                <Gap height={30} />
                <p>{notes.body}</p>
                <Gap height={30} />
                <h3>{showFormattedDate( notes.createdAt)}</h3>
                <Gap height={30} />
            </div>
        </ div>
    )
}

export default DetailNote;
