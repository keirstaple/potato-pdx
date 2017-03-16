import axios from 'axios';
require('dotenv').config()

export const FETCH_SITE_DATA = 'FETCH_SITE_DATA';

const ROOT_URL = 'https://api.vimeo.com/users/user58377879/videos';

const token = process.env.REACT_APP_ACCESS_TOKEN;
const init = {
  headers: {
    "Authorization": `Bearer ${token}`
  }
};

export function fetchData() {
  const request = axios.get(`${ROOT_URL}`, init);
  return {
    type: FETCH_SITE_DATA,
    payload: request
  };
}
