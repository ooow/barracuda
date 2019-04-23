import document from 'global/document';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import registerServiceWorker from './registerServiceWorker';
import Router from './app/router';
import './index.scss';
import './common/toastify.scss';

/** The Barracuda. */
class Index extends Component {
  render() {
    return (
      <Router />
    );
  }
}

toast.configure({
  autoClose: 3000,
});

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
