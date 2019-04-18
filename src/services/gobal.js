import { createHashHistory } from 'history';
import { removeCookie } from './cookies';

const history = createHashHistory();

export function reloadWindow() {
  window.location.reload(true);
}

export function redirectToLogin() {
  history.push('/login?logout=true');
}

export function signOut() {
  removeCookie();
  redirectToLogin();
}

export function navigate(route, searchParams) {
  let path = '/';
  if (route === 'home') {
    history.push('/');
  }
  if (route === 'dashboard') {
    history.push('/dashboard');
  }
  if(route === 'newSession') {
    path = '/new-session';
  }
  if(route === 'questionnaire') {
    path = '/new-session/questionnaire';
  }
  if(route === 'emotions') {
    path = '/new-session/emotions';
  }
  if(route === 'evaluation') {
    path = '/new-session/evaluation';
  }
  history.push({
    pathname: path,
    search: searchParams
  })
}
