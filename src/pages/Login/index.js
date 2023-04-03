import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LoginInput } from '../../components/molekules';
import { login } from '../../utils/api';
import './login.scss'

function LoginPage({ loginSuccess }) {
    async function onLogin({ email, password }) {
        const { error, data } = await login({ email, password });

        if (!error) {
            loginSuccess(data);
        }
    }

    return (
        <section className='login-page'>
            <div className='container-1'>
                <div className='left'>
                    INI KIRI
                </div>
                <div className='right'>
                    <h2>Silakan masuk untuk melanjutkan ...</h2>
                    <LoginInput login={onLogin} />
                    <p>Belum punya akun? <Link to="/register">Daftar di sini.</Link></p>
                </div>
            </div>
        </section>
    );
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired,
}

export default LoginPage;