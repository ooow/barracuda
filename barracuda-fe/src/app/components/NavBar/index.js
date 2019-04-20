import React, { Component } from 'react';
import Logo from '../../assets/images/sun.svg';

/**
 * A view component which displays a Navigation bar.
 */
class NavBar extends Component {

  render() {
    return (
      <nav className='navbar navbar-light bg-white border-bottom'>
        <div className='container d-flex flex-sm-nowrap justify-content-between'>
          <a className='navbar-brand mx-1 p-0 d-none d-sm-inline' href='/'>
            <img
              alt='Barracuda Logotype'
              className='wh-2em mr-2'
              src={Logo}
            />
            Barracuda
          </a>
          <span>
              <a className='navbar-brand mx-1 p-0 d-none d-sm-inline' href='/'>
                main
              </a>
              <a
                className='navbar-brand mx-1 p-0 d-none d-sm-inline'
                href='/dictionary'
              >
                dictionary
              </a>
            </span>
        </div>
      </nav>
    );
  }
}

export default NavBar;
