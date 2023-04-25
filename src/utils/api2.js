const {
  getData, postData, deleteData, putData,
} = require('./fetch');

const api2 = (() => {
  const BASE_URL = 'http://localhost:5000';

  async function login({ email, password }) {
    const response = await postData('/login', {
      email,
      password,
    });
    const { status, message } = response.data;

    if (status !== 'success') {
      throw new Error(message);
    }
    return (response.data.data);
  }
  async function logout(refreshToken) {
    const response = await postData('/logout', { refreshToken });
    const { status } = response.data;
    if (status !== 'success') {
      throw new Error('failed to logout');
    }
  }

  async function ourAuth() {
    const response = await getData('/users/me');
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    const { data: { user } } = response.data;

    return user;
  }
  // --------------------Reminder--------------------------------
  async function addReminder(reminder) {
    // title:string
    // content:string
    // date:string
    // category:string
    const response = await postData('/reminders', reminder);
    // console.log('hasilresponse', response)
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return (response.data.data);
  }

  async function getReminders() {
    const response = await getData('/reminders');
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return (response.data.data);
  }

  async function deleteReminderById(id) {
    const response = await deleteData(`/reminders/${id}`);
    const { status, message } = response.data;

    if (status !== 'success') {
      throw new Error(message);
    }
    return (response.data.data);
  }

  async function completeReminderById(id, type) {
    const response = await putData(`/reminders/${id}/complete/${type}`);
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return (response.data.data);
  }

  async function favoriteReminderById(id, type) {
    const response = await putData(`/reminders/${id}/favorite/${type}`);
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return (response.data.data);
  }

  // ------------------END Reminder------------------------------
  // --------------------Notes-----------------------------------
  async function addNotes(notes) {
    // title:string
    // content:string
    // category:string
    const response = await postData('/notes', notes);
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return (response.data.data);
  }

  async function getNotes() {
    const response = await getData('/notes');
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return (response.data.data);
  }

  async function deleteNotesById(id) {
    const response = await deleteData(`/notes/${id}`);
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return (response.data.data);
  }
  // ------------------END Notes---------------------------------

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token, refreshToken) {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJson;

    return user;
  }

  async function addComment(content, threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments
      `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { comment } } = responseJson;

    return comment;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJson;

    return user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { users } } = responseJson;

    return users;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { threads } } = responseJson;

    return threads;
  }

  async function getThreadDetail(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { detailThread } } = responseJson;

    return detailThread;
  }

  async function createThread({ title, body, category = '' }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { thread } } = responseJson;

    return thread;
  }

  async function toggleVotesThread(id, isUpVote) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/${isUpVote ? 'neutral-vote' : 'up-vote'}`, {
      method: 'POST',
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
  }

  return {
    favoriteReminderById,
    completeReminderById,
    deleteReminderById,
    ourAuth,
    addNotes,
    deleteNotesById,
    login,
    logout,
    putAccessToken,
    getAccessToken,
    register,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    createThread,
    toggleVotesThread,
    getThreadDetail,
    addComment,
    addReminder,
    getReminders,
    getNotes,
  };
})();

export default api2;
