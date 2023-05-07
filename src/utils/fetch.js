/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { BASE_URL } from '../config';
import handleError from './handleError';

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
    // console.log('error da', error);
    return handleError(error);
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
    // eslint-disable-next-line no-return-await
    return await handleError(err);
  }
}
export async function putData(url, payload) {
  try {
    const token = localStorage.getItem('accessToken')
      ? localStorage.getItem('accessToken')
      : {};
    return await axios.put(`${BASE_URL}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return handleError(err);
  }
}

export async function deleteData(url) {
  try {
    const token = localStorage.getItem('accessToken')
      ? localStorage.getItem('accessToken')
      : {};
    return await axios.delete(`${BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return handleError(err);
  }
}

export async function uploadImage(url, payload) {
  try {
    const token = localStorage.getItem('accessToken')
      ? localStorage.getItem('accessToken')
      : {};
    return await axios.post(`${BASE_URL}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    return handleError(err);
  }
}
