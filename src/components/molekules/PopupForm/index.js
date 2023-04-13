import {React , useNavigate, useState} from 'react'
import './Popup-Form.scss'
import { Gap } from '../../atoms';

function PopupForm(props) {
   
    // const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        category: '',
        date: '',
        content: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.className]: e.target.value });
    };

    const handleSubmit = (title, category, date, content) => {
        // addReminder({ title, category, date, content });
        // navigate('/reminder');
    };    

  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup__container'>
            <button className="popup__container__close-btn" onClick={() => props.setTrigger(false) }>X</button>

            <h1 className='popup__container__header'>Add a task</h1>   
            <Gap height={20} />
            <form className='popup__container__form' onClick={handleSubmit}>
            <label className='popup__container__form__title'>
            Title
            <input type="text" className='title' onChange={handleChange} />
            </label>
            <Gap height={20} />
            <label className='popup__container__form__date'>
            Date
            <input type="date" className='date' onChange={handleChange} />
            </label>
            <Gap height={20} />
            <label className='popup__container__form__content'>
            Content
            <textarea type="text" className='content' onChange={handleChange} />
            </label>
            <Gap height={20} />
            <label className='popup__container__form__category'>
            Category
            <input type="text" className='category' onChange={handleChange} />
            </label>
            <Gap height={20} />
            <button className="popup__container__submit-btn" >Submit</button>

            </form> 



        </div>
    </div>
  ) : "";
}

export default PopupForm