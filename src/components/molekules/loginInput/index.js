import React from 'react';
import PropTypes from 'prop-types';
import { Gap } from '../../atoms';
import { useInput } from '../../../hooks/useInput';
import '../loginInput/index.scss';

function LoginInput({ login }) {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  function onSubmitHandler(event) {
    event.preventDefault();
    login({
      email,
      password,
    });
  }
  return (
    <div>
      <form onSubmit={onSubmitHandler} className="login-input">
        <Gap height={28} />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={setEmail}
        />
        <Gap height={36} />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
        />
        <Gap height={16} />
        <button>Masuk</button>
        <Gap height={12} />
      </form>
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};
export default LoginInput;
