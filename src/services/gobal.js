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

export function navigate(route) {
  if (route === 'home') {
    history.push('/');
  }
  if (route === 'dashboard') {
    history.push('/dashboard');
  }
}

export function navigateWithParams(path, searchParams) {
  history.push({
    pathname: path,
    search: searchParams
  })
}
