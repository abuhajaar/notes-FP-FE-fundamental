import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LoginInput } from '../../components/molekules';
import './login.scss';
import grafik from '../../assets/image/grafik.png';
import { LocaleConsumer } from '../../contexts/LocaleContext';
import { asyncSetAuthUser } from '../../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch(); // @TODO: get dispatch function from store
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <LocaleConsumer>
      {({ locale }) => (
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
                  <img src={grafik} alt="#" />
                </div>
              </div>
            </div>
          </section>
          <footer className="contact-app__footer">
            <div className="left">
              <p>
                {locale === 'id'
                  ? 'Belum punya akun?'
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
      )}
    </LocaleConsumer>
  );
}

export default LoginPage;
