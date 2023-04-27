import axios from 'axios';
import { BASE_URL } from '../config';

const handleError = async (error) => {
  const originalRequest = error.config;
  if (error.response.data.message === 'Token maximum age exceeded') {
    originalRequest._retry = true;
    const session = localStorage.getItem('refreshToken')
      ? localStorage.getItem('refreshToken')
      : {};
    console.log('session', session);

    try {
      const res = await axios.put(`${BASE_URL}/authentications`, { refreshToken: session });
      console.log('res', res);
      localStorage.setItem(
        'accessToken',
        res.data.data.accessToken,
      );
      originalRequest.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
      return axios(originalRequest);
    } catch (err) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
    }
  }

  return Promise.reject(error);
};

export default handleError;
