import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { RootRoutes } from './routes';
import store from './redux/store';
import './assets/css/bootstrap.min.css';
import './assets/sass/cssi-dashboard.scss';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        {RootRoutes.map((route, key) => (
          <Route path={route.path} component={route.component} key={key} />
        ))}
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
