import Cookies from 'universal-cookie';
import { createHashHistory } from 'history';

const cookies = new Cookies();
export const history = createHashHistory();

export function setCookie(credentials) {
  cookies.set(
    process.env.REACT_APP_COOKIE_NAME, credentials,
    {
      path: process.env.REACT_APP_COOKIE_PATH,
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
  );
  history.push(process.env.REACT_APP_LOGIN_PATH);
}

export function removeCookie() {
  cookies.remove(
    process.env.REACT_APP_COOKIE_NAME,
    process.env.REACT_APP_COOKIE_PATH,
  );
  history.push(process.env.REACT_APP_LOGOUT_PATH);
}

export function getCookie() {
  return cookies.get(process.env.REACT_APP_COOKIE_NAME);
}

export function validateCookie() {
  return !!(cookies.get(process.env.REACT_APP_COOKIE_NAME)
    && cookies.get(process.env.REACT_APP_COOKIE_NAME).username
    && cookies.get(process.env.REACT_APP_COOKIE_NAME).hashedPassword);
}

export function getTokenFromCookie() {
  const cookie = cookies.get(process.env.REACT_APP_COOKIE_NAME)
    ? cookies.get(process.env.REACT_APP_COOKIE_NAME)
    : null;
  const username = cookie && cookies.get(process.env.REACT_APP_COOKIE_NAME).username !== undefined
    ? cookies.get(process.env.REACT_APP_COOKIE_NAME).username
    : null;
  const password = cookie && cookies.get(process.env.REACT_APP_COOKIE_NAME).hashedPassword !== undefined
    ? cookies.get(process.env.REACT_APP_COOKIE_NAME).hashedPassword
    : null;
  const token = cookie && username && password
    ? `Basic ${username}:${password}`
    : '';
  return token;
}
