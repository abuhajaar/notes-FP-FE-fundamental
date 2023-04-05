import React from 'react';
import PropTypes from 'prop-types';
import { LoginInput } from '../../components/molekules';
import { login } from '../../utils/api';
import './login.scss';
import study from '../../assets/image/school2.png';
import { LocaleConsumer } from '../../contexts/LocaleContext';
import { Link } from 'react-router-dom';

function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="paper">
            <section className="login-page">
              <div className="container-1">
                <div className="right">
                  <div className="flex">
                    <h1>
                      {locale === 'id'
                        ? 'Silahkan Masuk Untuk Melanjutkan...'
                        : 'Please Login to go further...'}
                    </h1>
                    <LoginInput login={onLogin} />
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s,
                    </p>
                  </div>
                </div>
                <div className="left">
                  <div className="image">
                    <img src={study} alt="#" />
                  </div>
                </div>
              </div>
            </section>
            <footer className="contact-app__footer">
              <div className="left">
                <p>
                  {locale === 'id'
                    ? 'Belum punya akun? ?'
                    : "Don't have an account?"}
                </p>
                <h3>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </h3>
              </div>
              <div className="right">
                <Link to="/register" className="btn-register">
                  {locale === 'id' ? 'Daftar Disini >' : ' Register >'}
                </Link>
              </div>
            </footer>
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
