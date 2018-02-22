import fetch from 'isomorphic-fetch';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

const ROOT_URL = 'https://api.vimeo.com/users/user58377879/videos';
const token = env.REACT_APP_ACCESS_TOKEN;

const promiseToFetch = (url, init) => fetch(url, init).then(response => {
  return response.json().then(json => {
    if (!response.ok) {
      return Promise.reject(json)
    }
    return json;
  });
});

export const fetchData = () => {
  const url = `${ROOT_URL}`;
  const init = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  };
  return promiseToFetch(url, init);
}

export const vimeoApi = {
  fetchData
}
