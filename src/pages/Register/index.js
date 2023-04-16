import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterInput } from '../../components/molekules';
import { LocaleConsumer } from '../../contexts/LocaleContext';
import { register } from '../../utils/api';
import './register.scss';

function RegisterPage() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/');
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="register-page">
            <div className="flex">
              <h2>
                {locale === 'id'
                  ? 'Silahkan Isi Form Pendaftaran'
                  : 'Please Fill the registration Form'}
              </h2>
              <RegisterInput register={onRegisterHandler} />
              <div className="register-back-to-login">
                <p>{locale === 'id' ? 'Kembali ke' : 'Back To'}</p>
                <Link to="/" className="btn-login">
                  Login
                </Link>
              </div>
              ;
            </div>
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

export default RegisterPage;
