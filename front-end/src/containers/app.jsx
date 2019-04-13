import React, { Component } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { AppRoutes } from '../routes';

class App extends Component {
  render() {
    return (
      <Switch>
        {
          AppRoutes.map((prop, key) => (
            <Route path={prop.path} component={prop.component} key={key} />
          ))
        }
      </Switch>
    );
  }
}

export default App;
