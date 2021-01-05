import os from 'os';

const host = os.hostname();
const port =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_SERVER_DEV_PORT
    : process.env.REACT_APP_SERVER_PORT;

export default `http://${host || 'localhost'}:${port || 5000}`;
