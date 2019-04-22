import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../pages/Main';
import NotFound from '../pages/NotFound';
import Dictionary from '../pages/Dictionary';
import Info from '../pages/Info';

/**
 * Main project routing configuration.
 */
class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Main} />,
          <Route exact path='/dictionary' component={Dictionary} />,
          <Route exact path='/info' component={Info} />,
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
