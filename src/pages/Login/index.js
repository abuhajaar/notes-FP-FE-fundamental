import React from 'react';
import PropTypes from 'prop-types';
import { LoginInput } from '../../components/molekules';
import { login } from '../../utils/api';
import './login.scss';
import study from '../../assets/image/school2.png';

function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className="paper">
      <section className="login-page">
        <div className="container-1">
          <div className="right">
            <div className="flex">
              <h1>Silahkan masuk untuk melanjutkan ...</h1>
              <LoginInput login={onLogin} />
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
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
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
