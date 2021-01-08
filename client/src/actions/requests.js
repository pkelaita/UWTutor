import os from 'os';
import * as fetch from 'node-fetch';

// Determine the URL of the server for API requests
const host = os.hostname();
const port =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_SERVER_DEV_PORT
    : process.env.REACT_APP_SERVER_PORT;
const serverURL = `http://${host || 'localhost'}:${port || 5000}`;

export async function requestLogin(id, password) {
  return fetch(`${serverURL}/login`, {
    method: 'post',
    body: JSON.stringify({ id, password }),
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function requestRegister(_id, password, name) {
  console.log(name);
  const body = {
    _id,
    password,
    name,
    is_client: false,
    is_tutor: false,
    course_ids: [],
  };
  return fetch(`${serverURL}/users`, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}
