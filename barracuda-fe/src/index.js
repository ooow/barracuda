import document from 'global/document';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Router from './app/router';
import './index.scss';

/** The Barracuda. */
class Index extends Component {
  render() {
    return (
      <Router />
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
