import React from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

import axios from 'axios';

function GoogleLoginTest() {
  const res = (codeResponse) => {
    console.log(codeResponse.credential);
    const token = codeResponse.credential;
    try {
      axios.post('http://localhost:5000/login/google', token, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    ux_mode: 'redirect',
    redirect_uri: 'https://your.domain/code_callback_endpoint',
  });

  return (
    <div>
      <h1>Google Login Test</h1>
      <button type="button" onClick={() => login()}>
        Sign in with Google 🚀
        {' '}
      </button>
      ;
    </div>
  );
}

export default GoogleLoginTest;
