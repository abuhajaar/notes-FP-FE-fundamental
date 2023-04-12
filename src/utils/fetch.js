/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { BASE_URL } from '../config';

export async function getData(url, params) {
  try {
    const token = localStorage.getItem('accessToken')
      ? localStorage.getItem('accessToken') : {};

    return await axios.get(`${BASE_URL}${url}`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
}
export async function postData(url, payload) {
  try {
    const token = localStorage.getItem('accessToken')
      ? localStorage.getItem('accessToken')
      : {};
    return await axios.post(`${BASE_URL}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return err;
  }
}
