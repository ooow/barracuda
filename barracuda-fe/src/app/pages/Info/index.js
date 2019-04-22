import React, { Component } from 'react';
import NavBar from '../../components/NavBar';

/** Component renders the Info page. */
class Info extends Component {
  render() {
    return (
      <div className='container'>
        <NavBar />
        <div className='container'>
          Info
          <div>(c) Goga Tirkiya</div>
        </div>
      </div>
    );
  }
}

export default Info;
