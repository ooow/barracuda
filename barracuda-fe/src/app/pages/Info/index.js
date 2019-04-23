import React, { Component } from 'react';
import NavBar from '../../components/NavBar';

/** Component renders the Info page. */
class Info extends Component {
  render() {
    return (
      <div className='container'>
        <NavBar />
        <div className='container col-sm-6 col-10 mt-4 text-justify info-text'>

          The <strong>&quot;Barracuda&quot;</strong> is a text analyzer. It
          provides the ability to check your text for obscene language. Text
          recognition works in live mode and uses self-studied artificial
          intelligence. In addition, you have the opportunity to train and
          improve the algorithm manually.
          <br />To try it you can go to the
          <a
            className='mx-1 p-0 d-none d-sm-inline'
            href='/dictionary'
            target='_blank'
          >
            Dictionary
          </a>
          page and add new words to the filter or delete existing ones. One more
          way to help is - use the site and after each checking of your text,
          you have the opportunity to rate the correctness of the work of the AI
          and algorithms. Simply evaluate the result and depending on the
          assessment, the AI ​​will process the verified text and assign it a
          quality level.

          <div className='mt-4'>
            The <strong>&quot;Barracuda</strong> is invented by
            <strong> Goga Tirkiya</strong>
            <div className='mt-4'>
              Email: <strong>tirkiya@icloud.com</strong>
            </div>
            <div>
              Source code:
              <a
                className='mx-1 p-0 d-none d-sm-inline'
                href='https://github.com/ooow/barracuda'
                rel='noopener noreferrer'
                target='_blank'
              >
                https://github.com/ooow/barracuda
              </a>
            </div>
            <div>
              License:
              <a
                className='mx-1 p-0 d-none d-sm-inline'
                href='https://opensource.org/licenses/MIT'
                rel='noopener noreferrer'
                target='_blank'
              >
                <strong>MIT</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
